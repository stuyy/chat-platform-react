import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../utils/context/SocketContext';
import { ConversationChannelPageStyle } from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import {
  editGroupMessage,
  fetchGroupMessagesThunk,
} from '../../store/groupMessageSlice';
import { GroupMessageType } from '../../utils/types';
import { GroupRecipientsSidebar } from '../../components/sidebars/group-recipients/GroupRecipientsSidebar';
import { EditGroupModal } from '../../components/modals/EditGroupModal';

export const GroupChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  const { showEditGroupModal } = useSelector(
    (state: RootState) => state.groups
  );
  const showSidebar = useSelector(
    (state: RootState) => state.groupSidebar.showSidebar
  );

  useEffect(() => {
    const groupId = parseInt(id!);
    dispatch(fetchGroupMessagesThunk(groupId));
  }, [id]);

  useEffect(() => {
    const groupId = id!;
    console.log(groupId);
    socket.emit('onGroupJoin', { groupId });
    socket.on('onGroupMessageUpdate', (message: GroupMessageType) => {
      console.log('onGroupMessageUpdate received');
      console.log(message);
      dispatch(editGroupMessage(message));
    });
    return () => {
      socket.emit('onGroupLeave', { groupId });
      socket.off('onGroupMessageUpdate');
    };
  }, [id]);

  const sendTypingStatus = () => {};

  return (
    <>
      {showEditGroupModal && <EditGroupModal />}
      <ConversationChannelPageStyle>
        <MessagePanel
          sendTypingStatus={sendTypingStatus}
          isRecipientTyping={isRecipientTyping}
        ></MessagePanel>
      </ConversationChannelPageStyle>
      {showSidebar && <GroupRecipientsSidebar />}
    </>
  );
};
