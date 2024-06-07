import http from 'http';
import express from 'express';
import { WebSocketServer } from './lib/websocket-server';

export const app = express();
export const server = http.createServer(app);
export const wss = new WebSocketServer({ server });
