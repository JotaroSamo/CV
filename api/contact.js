export default async function handler(req, res) {
  // In-memory protections (reset on cold start)
  globalThis.__contactRateMap = globalThis.__contactRateMap || new Map();
  globalThis.__contactBanMap = globalThis.__contactBanMap || new Map();
  globalThis.__contactByKeyMap = globalThis.__contactByKeyMap || new Map();
  const RATE_LIMIT_MAX = 2; // max requests per 30s
  const RATE_LIMIT_WINDOW_MS = 30 * 1000; // 30s window
  const RATE_LIMIT_HOURLY_MAX = 20; // per hour
  const RATE_LIMIT_HOURLY_MS = 60 * 60 * 1000;
  const BAN_MINUTES = 15;

  const ip =
    (req.headers['x-forwarded-for'] || '')
      .toString()
      .split(',')[0]
      .trim() || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const bannedUntil = globalThis.__contactBanMap.get(ip) || 0;
  if (now < bannedUntil) {
    res.status(429).json({ ok: false, error: 'Temporarily blocked. Try later.' });
    return;
  }
  const bucket = globalThis.__contactRateMap.get(ip) || [];
  const shortRecent = bucket.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  const hourRecent = bucket.filter(ts => now - ts < RATE_LIMIT_HOURLY_MS);
  if (shortRecent.length >= RATE_LIMIT_MAX || hourRecent.length >= RATE_LIMIT_HOURLY_MAX) {
    globalThis.__contactBanMap.set(ip, now + BAN_MINUTES * 60 * 1000);
    res.status(429).json({ ok: false, error: 'Too many requests. Please try later.' });
    return;
  }
  shortRecent.push(now);
  globalThis.__contactRateMap.set(ip, shortRecent);

  // Sanitize env vars to avoid stray quotes/semicolons from .env
  const rawToken = process.env.TELEGRAM_BOT_TOKEN || '';
  const rawChatId = process.env.TELEGRAM_CHAT_ID || '';
  const token = String(rawToken).trim().replace(/^['"]|['"];?$/g, '');
  const chatId = String(rawChatId).trim().replace(/^['"]|['"];?$/g, '');

  if (req.method === 'GET') {
    res.status(200).json({ ok: true, message: 'contact endpoint is alive ' + token + ' ' + chatId });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Random small delay: slows down scripted spam
    const delay = 400 + Math.floor(Math.random() * 500);
    await new Promise(r => setTimeout(r, delay));

    // Basic User-Agent filter
    const ua = (req.headers['user-agent'] || '').toString().toLowerCase();
    if (!ua || ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
      res.status(403).send('Forbidden');
      return;
    }
    // Basic origin check (optional: adjust allowedOrigins to your domain)
    const allowedOrigins = [
      'http://localhost:4200',
      'http://localhost:3000',
      'https://visite-card.vercel.app', // keep placeholder, match below
    ];
    const origin = (req.headers.origin || '').toString();
    const referer = (req.headers.referer || '').toString();
    const isAllowed =
      origin === '' || // some browsers omit origin
      allowedOrigins.some(o => o !== 'https://' ? origin.startsWith(o) || referer.startsWith(o) : referer.startsWith('https://'));
    if (!isAllowed) {
      // Do not leak reason
      res.status(403).send('Forbidden');
      return;
    }

    const { contact, message, hp } = req.body || {};
    // Honeypot field: if present, silently accept
    if (hp && String(hp).trim() !== '') {
      res.status(204).end();
      return;
    }
    if (!contact || !message || String(message).trim().length < 5) {
      res.status(400).send('Invalid data');
      return;
    }

    // Content limits
    const contactStr = String(contact).trim();
    const messageStr = String(message).trim();
    if (contactStr.length > 128 || messageStr.length > 4000) {
      res.status(413).send('Payload too large');
      return;
    }

    // Per-contact throttling (avoid repeated spam to same contact key)
    const contactKey = String(contact).trim().toLowerCase().slice(0, 128);
    const keyHist = globalThis.__contactByKeyMap.get(contactKey) || [];
    const keyRecent = keyHist.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    if (keyRecent.length >= 1) {
      res.status(429).send('Too many requests (contact). Try later.');
      return;
    }
    globalThis.__contactByKeyMap.set(contactKey, [...keyRecent, now]);

    if (!token || !chatId) {
      res.status(500).send('Telegram not configured');
      return;
    }

    const text = `🆕 Новое сообщение с сайта\nIP: ${ip}\nКонтакт: ${contact}\nСообщение: ${message}`;
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;



    const tgResp = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: isNaN(Number(chatId)) ? chatId : Number(chatId), text })
    });

    if (!tgResp.ok) {
      const t = await tgResp.text();
      res.status(502).send('Telegram error: ' + t);
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).send('Server error');
  }
}


