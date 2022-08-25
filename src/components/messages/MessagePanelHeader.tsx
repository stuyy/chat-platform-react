import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { MessagePanelHeaderStyle } from '../../utils/styles';

export const MessagePanelHeader = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const displayName =
    user?.id === conversation?.creator.id
      ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
      : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`;

  return <MessagePanelHeaderStyle>{displayName}</MessagePanelHeaderStyle>;
};
