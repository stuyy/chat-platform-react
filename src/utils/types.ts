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
  createdAt: Date;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};

export type MessageEventPayload = {
  id: number;
  createdAt: string;
  conversation: ConversationType;
  author: User;
  content: string;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};
