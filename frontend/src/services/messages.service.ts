import { CreateMessageDto, Message } from '@simple-chat/shared';

class MessagesService {
  async getMessages(): Promise<Message[]> {
    const res = await fetch('http://localhost:3000/messages');

    return res.json();
  }

  async addMessage(message: CreateMessageDto): Promise<Message> {
    const res = await fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    return res.json();
  }
}

export const messagesService = new MessagesService();
