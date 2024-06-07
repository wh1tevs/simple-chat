import ws from 'ws';

// from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c58e3459ea3d434ca1e7bf3a0e1ffcb4a95d363b/types/ws/index.d.ts#L18-L36
export type BufferLike =
  | string
  | Buffer
  | DataView
  | number
  | ArrayBufferView
  | Uint8Array
  | ArrayBuffer
  | SharedArrayBuffer
  | readonly any[]
  | readonly number[]
  | { valueOf(): ArrayBuffer }
  | { valueOf(): SharedArrayBuffer }
  | { valueOf(): Uint8Array }
  | { valueOf(): readonly number[] }
  | { valueOf(): string }
  | { [Symbol.toPrimitive](hint: string): string };

export class WebSocketServer extends ws.Server {
  sendToAllClients(data: BufferLike) {
    this.clients.forEach((client) => {
      client.send(data);
    });
  }
}
