import { Message } from 'react-hook-form';

export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredentialsParams = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type ConversationType = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: MessageType;
};

export type CreateConversationParams = {
  recipient: string;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  conversation: ConversationType;
};

export type FetchMessagePayload = {
  id: number;
  messages: MessageType[];
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: ConversationType;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};

export type ConversationMessage = {
  id: number;
  messages: MessageType[];
};
