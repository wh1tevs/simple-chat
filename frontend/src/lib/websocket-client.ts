export class WebSocketClient extends WebSocket {
  listeners = new Map<string, Set<(...args: any[]) => void>>();

  isOpen = false;

  constructor(url: string | URL) {
    super(url);

    this.onopen = () => {
      this.isOpen = true;
    };

    this.onclose = () => {
      this.isOpen = false;
    };

    this.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      this.listeners.get(type)?.forEach((listener) => listener(data));
    };
  }

  on(event: string, listener: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set([listener]));
      return;
    }

    this.listeners.get(event)?.add(listener);
  }

  off(event: string, listener: (...args: any[]) => void) {
    this.listeners.get(event)?.delete(listener);
  }
}
