import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
// Node 18+ has global fetch; for older versions you can install node-fetch

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Body parser for JSON
app.use(express.json({ limit: '100kb' }));

// Contact endpoint → forwards to Telegram Bot
app.post('/api/contact', async (req, res): Promise<void> => {
  try {
    const { contact, message } = req.body || {};
    if (!contact || !message || String(message).trim().length < 5) {
      res.status(400).send('Invalid data');
      return;
    }

    const token = process.env['8449849509:AAFh0dRepmCe59EzRvowPmwhR_AGzrFJtZE'];
    const chatId = process.env['5808559919'];
    if (!token || !chatId) {
      res.status(500).send('Telegram not configured');
      return;
    }

    const text = `🆕 Новое сообщение с сайта\nКонтакт: ${contact}\nСообщение: ${message}`;
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const tgResp = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    if (!tgResp.ok) {
      const t = await tgResp.text();
      res.status(502).send('Telegram error: ' + t);
      return;
    }
    res.status(200).json({ ok: true });
    return;
  } catch (e) {
    res.status(500).send('Server error');
    return;
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
