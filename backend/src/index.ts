import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Client, middleware, WebhookEvent } from '@line/bot-sdk';

const config = {
  channelAccessToken: 'ZATSCX7jJfr0JNIBh08SOulayhT+ylUfODRDdB3nKUsx22zf4/Kfb7kkAVTHPfYkBqvjFRNULFo0b3e3BcHlg7fa06O2DaTfAhunVG4ToIxCgWTYzcS7XA8Jmi8b6btAoCNdSQkrlPalv4ScRoJd9wdB04t89/1O/w1cDnyilFU=',
  channelSecret: '6ac867326519450a35406ab44a6bef19',
};

const client = new Client(config);
const app = express();

app.use(bodyParser.json());

app.post('/webhook', middleware(config), (req: Request, res: Response) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event: WebhookEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const echo = { type: 'text', text: event.message.text };
  return client.replyMessage(event.replyToken, echo);
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
