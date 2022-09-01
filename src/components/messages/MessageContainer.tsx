import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  EditMessageInputField,
  MessageContainerStyle,
  MessageItemContainer,
  MessageItemContent,
} from '../../utils/styles';
import { MessageType } from '../../utils/types';
import { AuthContext } from '../../utils/context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { MessageMenuContext } from '../../utils/context/MessageMenuContext';
import { SelectedMessageContextMenu } from '../context-menus/SelectedMessageContextMenu';
import { FormattedMessage } from './FormattedMessage';
import { EditMessageContainer } from './EditMessageContainer';
import { selectConversationMessage } from '../../store/messageSlice';

export const MessageContainer = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [selectedEditMessage, setSelectedEditMessage] =
    useState<MessageType | null>(null);
  const [originalEditMessage, setOriginalEditMessage] =
    useState(selectedEditMessage);
  const [isEditing, setIsEditing] = useState(false);
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, parseInt(id!))
  );

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setPoints({ x: e.pageX, y: e.pageY });
    setSelectedMessage(message);
  };

  const onEditMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEditMessage) return;
    setSelectedEditMessage(
      (prev) => prev && { ...prev, content: e.target.value }
    );
  };

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [id]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === 'Escape' && setIsEditing(false);
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [id]);

  useEffect(() => {
    return () => {
      console.log('Unmounting');
      setSelectedMessage(null);
      setSelectedEditMessage(null);
      setIsEditing(false);
    };
  }, [id]);

  const formatChatMessages = () => {
    
  };

  const formatMessages = () => {
    if (!conversationMessages) return [];
    console.log(conversationMessages);
    return conversationMessages.messages.map((m, index, arr) => {
      const nextIndex = index + 1;
      const currentMessage = arr[index];
      const nextMessage = arr[nextIndex];
      if (arr.length === nextIndex)
        return (
          <FormattedMessage
            onContextMenu={(e) => onContextMenu(e, m)}
            key={m.id}
            user={user}
            message={m}
            isEditing={isEditing}
            selectedEditMessage={selectedEditMessage}
            onEditMessageChange={onEditMessageChange}
            setIsEditing={setIsEditing}
          />
        );
      if (currentMessage.author.id === nextMessage.author.id) {
        return (
          <MessageItemContainer
            key={m.id}
            onContextMenu={(e) => onContextMenu(e, m)}
          >
            {isEditing && m.id === selectedEditMessage?.id ? (
              <MessageItemContent padding="0 0 0 70px">
                <EditMessageContainer
                  selectedEditMessage={selectedEditMessage}
                  onEditMessageChange={onEditMessageChange}
                  setIsEditing={setIsEditing}
                />
              </MessageItemContent>
            ) : (
              <MessageItemContent padding="0 0 0 70px">
                {m.content}
              </MessageItemContent>
            )}
          </MessageItemContainer>
        );
      }
      return (
        <FormattedMessage
          onContextMenu={(e) => onContextMenu(e, m)}
          key={m.id}
          user={user}
          message={m}
          isEditing={isEditing}
          selectedEditMessage={selectedEditMessage}
          onEditMessageChange={onEditMessageChange}
          setIsEditing={setIsEditing}
        />
      );
    });
  };
  return (
    <MessageMenuContext.Provider
      value={{
        message: selectedMessage,
        editMessage: selectedEditMessage,
        setMessage: setSelectedMessage,
        setEditMessage: setSelectedEditMessage,
      }}
    >
      <MessageContainerStyle>
        <>{formatMessages()}</>
        {showMenu && (
          <SelectedMessageContextMenu
            points={points}
            setIsEditing={setIsEditing}
          />
        )}
      </MessageContainerStyle>
    </MessageMenuContext.Provider>
  );
};
