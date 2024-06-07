import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WebSocketProvider } from './hooks/useWebSocket';
import { WebSocketClient } from './lib/websocket-client';

const queryClient = new QueryClient();
const socket = new WebSocketClient('ws://localhost:3000');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WebSocketProvider socket={socket}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WebSocketProvider>
  </React.StrictMode>
);
