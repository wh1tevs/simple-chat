import { MessagesList } from '../messages/MessagesList';
import { MessageForm } from '../messages/MessageForm';

export function App() {
  return (
    <div className="w-full h-full flex flex-col">
      <MessagesList />
      <div className="flex-shrink border-t border-neutral-300 px-4 py-2">
        <MessageForm />
      </div>
    </div>
  );
}
