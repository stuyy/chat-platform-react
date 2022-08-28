import { createContext, Dispatch, SetStateAction } from 'react';
import { MessageType } from '../types';

type MessageMenuContextType = {
  message: MessageType | null;
  editMessage: MessageType | null;
  setMessage: Dispatch<SetStateAction<MessageType | null>>;
  setEditMessage: Dispatch<SetStateAction<MessageType | null>>;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
  message: null,
  editMessage: null,
  setMessage: () => {},
  setEditMessage: () => {},
});
