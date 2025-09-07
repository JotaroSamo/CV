export default async function handler(req, res) {
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
    const { contact, message } = req.body || {};
    if (!contact || !message || String(message).trim().length < 5) {
      res.status(400).send('Invalid data');
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


