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
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';

type Props = {
  messages: MessageType[];
};

type FormattedMessageProps = {
  user?: User;
  message: MessageType;
  key: number;
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
              color: user?.id === message.author.id ? '#989898' : '#5E8BFF',
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        <MessageItemContent padding="8px 0 0 0">
          {message.content}
        </MessageItemContent>
      </MessageItemDetails>
    </MessageItemContainer>
  );
};

export const MessageContainer: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const conversationMessages = useSelector(
    (state: RootState) => state.conversation.messages
  );

  useEffect(() => {
    console.log(id);
  }, []);

  const formatMessages = () => {
    const msgs = conversationMessages.find((cm) => cm.id === parseInt(id!));
    if (!msgs) return [];
    return msgs?.messages?.map((m, index, arr) => {
      const nextIndex = index + 1;
      const currentMessage = arr[index];
      const nextMessage = arr[nextIndex];
      if (arr.length === nextIndex)
        return <FormattedMessage key={m.id} user={user} message={m} />;
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer key={m.id}>
            <MessageItemContent padding="0 0 0 70px">
              {m.content}
            </MessageItemContent>
          </MessageItemContainer>
        );
      }
      return <FormattedMessage key={m.id} user={user} message={m} />;
    });
  };

  useEffect(() => {
    formatMessages();
  });

  return <MessageContainerStyle>{formatMessages()}</MessageContainerStyle>;
};
