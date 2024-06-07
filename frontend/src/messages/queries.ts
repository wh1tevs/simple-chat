import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messagesService } from '../services/messages.service';
import {
  CreateMessageDto,
  Message,
  WebSocketEvents,
} from '@simple-chat/shared';
import { useWebSocket } from '../hooks/useWebSocket';

export const FETCH_MESSAGES_QUERY_KEY = ['messages'];
export const CREATE_MESSAGE_MUTATION_KEY = ['message', 'create'];

export function useFetchMessages() {
  const ws = useWebSocket();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: FETCH_MESSAGES_QUERY_KEY,
    queryFn: () => messagesService.getMessages(),
  });

  useEffect(() => {
    const addHandler = (message: Message) => {
      queryClient.setQueryData<Message[]>(
        FETCH_MESSAGES_QUERY_KEY,
        (messages = []) => [...messages, message]
      );
    };
    const removeHandler = ({ id }: Message) => {
      queryClient.setQueryData<Message[]>(
        FETCH_MESSAGES_QUERY_KEY,
        (messages = []) => messages.filter((message) => message.id !== id)
      );
    };
    console.log(1);

    ws?.on(WebSocketEvents.NewMessage, addHandler);
    ws?.on(WebSocketEvents.RemoveMessage, removeHandler);

    return () => {
      ws?.off(WebSocketEvents.NewMessage, addHandler);
      ws?.off(WebSocketEvents.RemoveMessage, removeHandler);
    };
  }, [ws, queryClient]);

  return query;
}

export function useCreateMessage() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: CREATE_MESSAGE_MUTATION_KEY,
    mutationFn: (message: CreateMessageDto) =>
      messagesService.addMessage(message),
  });

  return mutation;
}
