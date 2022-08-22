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
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};
