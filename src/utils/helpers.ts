import { Conversation, User } from './types';

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User
) => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};
