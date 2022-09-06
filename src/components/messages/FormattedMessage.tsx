import { formatRelative } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  MessageItemContainer,
  MessageItemDetails,
  MessageItemHeader,
  MessageItemContent,
} from '../../utils/styles';
import { User, MessageType, GroupMessageType } from '../../utils/types';
import { EditMessageContainer } from './EditMessageContainer';
import { ItemAvatarContainer } from './MessageItemAvatar';

type FormattedMessageProps = {
  user?: User;
  message: MessageType | GroupMessageType;
  key: number;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};



export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  user,
  message,
  onContextMenu,
  onEditMessageChange,
}) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer
  );
  return (
    <MessageItemContainer onContextMenu={onContextMenu}>
      <ItemAvatarContainer user={message.author} />
      <MessageItemDetails>
        <MessageItemHeader>
          <span
            className="authorName"
            style={{
              color: user?.id === message.author.id ? '#5E8BFF' : '#989898',
            }}
          >
            {message.author.firstName} {message.author.lastName}
          </span>
          <span className="time">
            {formatRelative(new Date(message.createdAt), new Date())}
          </span>
        </MessageItemHeader>
        {isEditingMessage && message.id === messageBeingEdited?.id ? (
          <MessageItemContent padding="8px 0 0 0">
            <EditMessageContainer onEditMessageChange={onEditMessageChange} />
          </MessageItemContent>
        ) : (
          <MessageItemContent padding="8px 0 0 0">
            {message.content}
          </MessageItemContent>
        )}
      </MessageItemDetails>
    </MessageItemContainer>
  );
};
