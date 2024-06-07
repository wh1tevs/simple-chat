import { CreateMessageDto, Message } from '@simple-chat/shared';

class MessagesService {
  private messages: Message[] = [
    {
      id: crypto.randomUUID(),
      text: 'Hello, World!',
      author: 'anonymous',
    },
  ];

  async getMessagesCount() {
    return this.messages.length;
  }

  async getFirstMessage() {
    return this.messages[0];
  }

  async getAll(): Promise<Message[]> {
    return this.messages;
  }

  async create(dto: CreateMessageDto): Promise<Message> {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: dto.text,
      author: dto.author ?? 'anonymous',
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  async removeHead() {
    return this.messages.shift();
  }
}

export const messagesService = new MessagesService();
