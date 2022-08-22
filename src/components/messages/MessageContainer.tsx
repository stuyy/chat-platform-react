import { FC, useContext, useEffect } from 'react';
import { formatRelative } from 'date-fns';
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from '../../utils/styles';
import { MessageType, User } from '../../utils/types';
import { AuthContext } from '../../utils/context/AuthContext';

type Props = {
  messages: MessageType[];
};

type FormattedMessageProps = {
  user?: User;
  message: MessageType;
};
export const FormattedMessage: FC<FormattedMessageProps> = ({
  user,
  message,
}) => {
  return (
    <MessageItemContainer>
      <MessageItemAvatar />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? '#757575' : '#5E8BFF',
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        <MessageItemContent>{message.content}</MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

export const MessageContainer: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext);

  const formatMessages = () => {
    return messages.map((m, index, arr) => {
      console.log(index);
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];
      console.log(currentMessage);
      console.log(nextMessage);
      if (arr.length === index + 1) {
        console.log('At the end');
        return <FormattedMessage user={user} message={m} />;
      }
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer>
            <MessageItemContent padding="0 0 0 70px">
              {m.content}
            </MessageItemContent>
          </MessageItemContainer>
        );
      }
      return <FormattedMessage user={user} message={m} />;
    });
  };

  useEffect(() => {
    formatMessages();
  });

  return <MessageContainerStyle>{formatMessages()}</MessageContainerStyle>;
};
