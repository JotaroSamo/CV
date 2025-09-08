export default async function handler(req, res) {
  // Simple in-memory rate limiting by IP (resets on cold start)
  globalThis.__contactRateMap = globalThis.__contactRateMap || new Map();
  const RATE_LIMIT_MAX = 3; // max requests
  const RATE_LIMIT_WINDOW_MS = 60 * 1000; // per 60s

  const ip =
    (req.headers['x-forwarded-for'] || '')
      .toString()
      .split(',')[0]
      .trim() || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const bucket = globalThis.__contactRateMap.get(ip) || [];
  const recent = bucket.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    res.status(429).json({ ok: false, error: 'Too many requests. Please try later.' });
    return;
  }
  recent.push(now);
  globalThis.__contactRateMap.set(ip, recent);

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

    const { contact, message } = req.body || {};
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

   
    if (!token || !chatId) {
      res.status(500).send('Telegram not configured');
      return;
    }

    const text = `🆕 Новое сообщение с сайта\nКонтакт: ${contact}\nСообщение: ${message}`;
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


