import { CreateMessageDto, WebSocketEvents } from '@simple-chat/shared';
import express from 'express';
import { messagesService } from '../services/messages.service';
import { wss } from '../server';

export const router = express.Router();

const MAX_MESSAGES_COUNT = process.env.MAX_MESSAGES_COUNT
  ? Number(process.env.MAX_MESSAGES_COUNT)
  : 9;

router.get('/', async (req, res) => {
  const messages = await messagesService.getAll();

  return res
    .status(200)
    .setHeader('content-type', 'application/json')
    .send(JSON.stringify(messages));
});

router.post('/', async (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    return res
      .status(400)
      .send({ error: 'Only application/json is supported' });
  }

  const message = req.body as CreateMessageDto;

  if (!message.text) {
    return res.status(400).send({ error: 'Text is required' });
  }

  const newMessage = await messagesService.create(message);

  if ((await messagesService.getMessagesCount()) > MAX_MESSAGES_COUNT) {
    const message = await messagesService.removeHead();
    wss.emit(WebSocketEvents.RemoveMessage, message);
  }

  wss.emit(WebSocketEvents.NewMessage, newMessage);

  return res
    .status(200)
    .setHeader('content-type', 'application/json')
    .send(newMessage);
});

wss.on(WebSocketEvents.NewMessage, (message) => {
  wss.sendToAllClients(
    JSON.stringify({
      type: WebSocketEvents.NewMessage,
      data: message,
    })
  );
});

wss.on(WebSocketEvents.RemoveMessage, (message) => {
  wss.sendToAllClients(
    JSON.stringify({
      type: WebSocketEvents.RemoveMessage,
      data: message,
    })
  );
});
