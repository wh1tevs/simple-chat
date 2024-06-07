import React, { createContext, useContext } from 'react';
import { WebSocketClient } from '../lib/websocket-client';

export interface WebSocketProviderProps extends React.PropsWithChildren {
  socket: WebSocketClient;
}

export const WebSocketContext = createContext<WebSocketClient | null>(null);

export function WebSocketProvider({
  socket,
  children,
}: WebSocketProviderProps) {
  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
