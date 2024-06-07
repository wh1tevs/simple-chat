import { Message } from '@simple-chat/shared';

export interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={`${message.author === 'me' ? 'font-semibold' : ''}`}
    >
      <span>[{message.author}]</span>:&nbsp;
      <span>{message.text}</span>
    </div>
  );
}
