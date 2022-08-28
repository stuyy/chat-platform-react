import { ConversationType, User } from './types';

export const getRecipientFromConversation = (
  conversation?: ConversationType,
  user?: User
) => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};
