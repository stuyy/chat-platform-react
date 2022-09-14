import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainer,
  MessageItemDetails,
} from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import { GroupMessageType, MessageType } from '../../utils/types';
import { SelectedMessageContextMenu } from '../context-menus/SelectedMessageContextMenu';
import { selectConversationMessage } from '../../store/messages/messageSlice';
import { selectGroupMessage } from '../../store/groupMessageSlice';
import { selectType } from '../../store/selectedSlice';
import {
  editMessageContent,
  resetMessageContainer,
  setContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleContextMenu,
} from '../../store/messageContainerSlice';
import { MessageItemHeader } from './MessageItemHeader';
import { MessageItemContainerBody } from './MessageItemContainerBody';
import { useHandleClick, useKeydown } from '../../utils/hooks';

export const MessageContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );
  const groupMessages = useSelector((state: RootState) =>
    selectGroupMessage(state, parseInt(id!))
  );
  const selectedType = useSelector((state: RootState) => selectType(state));
  const { showContextMenu } = useSelector(
    (state: RootState) => state.messageContainer
  );
  const handleKeydown = (e: KeyboardEvent) =>
    e.key === 'Escape' && dispatch(setIsEditing(false));
  const handleClick = () => dispatch(toggleContextMenu(false));

  useKeydown(handleKeydown, [id]);
  useHandleClick(handleClick, [id]);

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer());
    };
  }, [id]);

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType | GroupMessageType
  ) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedMessage(message));
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(editMessageContent(e.target.value));

  const mapMessages = (
    message: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[]
  ) => {
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    const showMessageHeader =
      messages.length === index + 1 ||
      currentMessage.author.id !== nextMessage.author.id;
    return (
      <MessageItemContainer
        key={message.id}
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader && <MessageItemAvatar />}
        {showMessageHeader ? (
          <MessageItemDetails>
            <MessageItemHeader message={message} />
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding="8px 0 0 0"
            />
          </MessageItemDetails>
        ) : (
          <MessageItemContainerBody
            message={message}
            onEditMessageChange={onEditMessageChange}
            padding="0 0 0 70px"
          />
        )}
      </MessageItemContainer>
    );
  };

  return (
    <MessageContainerStyle>
      <>
        {selectedType === 'private'
          ? conversationMessages?.messages.map(mapMessages)
          : groupMessages?.messages.map(mapMessages)}
      </>
      {showContextMenu && <SelectedMessageContextMenu />}
    </MessageContainerStyle>
  );
};
