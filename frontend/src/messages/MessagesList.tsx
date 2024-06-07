import { useFetchMessages } from './queries';
import { MessageItem } from './MessageItem';
import React, { useEffect, useRef } from 'react';

export function MessagesList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: messages } = useFetchMessages();

  useEffect(() => {
    containerRef.current?.scroll({
      behavior: 'smooth',
      top: containerRef.current.scrollHeight,
    });
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-grow flex flex-col items-start px-4 py-2 space-y-2 mx-h-full overflow-y-auto"
    >
      {messages?.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
