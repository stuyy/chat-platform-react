import { FC, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { deleteMessageThunk } from '../../store/messageSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { MessageMenuContext } from '../../utils/context/MessageMenuContext';
import { ContextMenuStyle } from '../../utils/styles';

type Props = {
  points: { x: number; y: number };
};

export const SelectedMessageContextMenu: FC<Props> = ({ points }) => {
  const { message } = useContext(MessageMenuContext);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const deleteMessage = () => {
    const conversationId = parseInt(id!);
    console.log(`Delete message ${message?.id}`);
    if (!message) return;
    dispatch(deleteMessageThunk({ conversationId, messageId: message.id }));
  };
  return (
    <ContextMenuStyle top={points.y} left={points.x}>
      <ul>
        {message?.author.id === user?.id && (
          <li onClick={deleteMessage}>Delete</li>
        )}
        {message?.author.id === user?.id && <li>Edit</li>}
      </ul>
    </ContextMenuStyle>
  );
};
