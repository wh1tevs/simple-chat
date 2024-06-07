import express from 'express';
import cors from 'cors';
import { app, server } from './server';
import { messagesRouter } from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

app.use('/messages', messagesRouter);

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
