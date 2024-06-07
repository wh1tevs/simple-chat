import { useState } from 'react';
import { useCreateMessage } from './queries';

export function MessageForm() {
  const createMessageMutation = useCreateMessage();

  const [author, setAuthor] = useState('anonymous');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessageMutation.mutate({
      text: message,
    });
    setMessage('');
  };

  return (
    <form className="flex space-x-2" onSubmit={handleSubmit}>
      <input
        name="author"
        className="border rounded px-2 py-1"
        placeholder="username"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        name="message"
        className="h-auto w-full border rounded px-2 py-1"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-8 py-1 rounded disabled:opacity-50"
        disabled={!message.length || createMessageMutation.isPending}
      >
        Send
      </button>
    </form>
  );
}
