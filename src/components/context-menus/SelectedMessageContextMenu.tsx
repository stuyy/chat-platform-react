import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { deleteGroupMessageThunk } from '../../store/groupMessageSlice';
import {
  setIsEditing,
  setMessageBeingEdited,
} from '../../store/messageContainerSlice';
import { deleteMessageThunk } from '../../store/messages/messageThunk';
import { selectType } from '../../store/selectedSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';

export const SelectedMessageContextMenu = () => {
  const { id: routeId } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const conversationType = useSelector((state: RootState) => selectType(state));
  const { selectedMessage: message, points } = useSelector(
    (state: RootState) => state.messageContainer
  );

  const deleteMessage = () => {
    const id = parseInt(routeId!);
    console.log(`Delete message ${message?.id}`);
    if (!message) return;
    const messageId = message.id;
    return conversationType === 'private'
      ? dispatch(deleteMessageThunk({ id, messageId: message.id }))
      : dispatch(deleteGroupMessageThunk({ id, messageId }));
  };

  const editMessage = () => {
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(message));
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      {message?.author.id === user?.id && (
        <ContextMenuItem onClick={deleteMessage}>Delete</ContextMenuItem>
      )}
      {message?.author.id === user?.id && (
        <ContextMenuItem onClick={editMessage}>Edit</ContextMenuItem>
      )}
    </ContextMenu>
  );
};
