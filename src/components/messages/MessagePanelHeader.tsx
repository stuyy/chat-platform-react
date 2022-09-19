import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { selectConversationById } from '../../store/conversationSlice';
import { selectGroupById } from '../../store/groupSlice';
import { selectType } from '../../store/selectedSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { GroupHeaderIcons, MessagePanelHeaderStyle } from '../../utils/styles';
import { PersonAdd, PeopleGroup } from 'akar-icons';
import { AddGroupRecipientModal } from '../modals/AddGroupRecipientModal';
import { toggleSidebar } from '../../store/groupRecipientsSidebarSlice';
import { FaVideo } from 'react-icons/fa';
import { getRecipientFromConversation } from '../../utils/helpers';
import { DataConnection } from 'peerjs';
import {
  setActiveConversationId,
  setCall,
  setCaller,
  setConnection,
  setIsCalling,
  setLocalStream,
  setPeer,
  setReceiver,
} from '../../store/call/callSlice';
import { SocketContext } from '../../utils/context/SocketContext';

export const MessagePanelHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const { peer, connection, call } = useSelector(
    (state: RootState) => state.call
  );
  const type = useSelector(selectType);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  const dispatch = useDispatch<AppDispatch>();
  const recipient = getRecipientFromConversation(conversation, user);
  const displayName =
    user?.id === conversation?.creator.id
      ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
      : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`;
  const groupName = group?.title || 'Group';
  const headerTitle = type === 'group' ? groupName : displayName;

  const callUser = async () => {
    console.log(recipient);
    if (!recipient) return console.log('Recipient undefined');
    if (!user) return console.log('User undefined');
    socket.emit('onVideoCallInitiate', {
      conversationId: conversation!.id,
      recipientId: recipient.id,
    });
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    dispatch(setLocalStream(stream));
    dispatch(setIsCalling(true));
    dispatch(setActiveConversationId(conversation!.id));
    dispatch(setCaller(user));
    dispatch(setReceiver(recipient));
  };

  return (
    <>
      {showModal && (
        <AddGroupRecipientModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <MessagePanelHeaderStyle>
        <div>
          <span>{headerTitle}</span>
        </div>
        <GroupHeaderIcons>
          {type === 'private' && (
            <FaVideo size={30} cursor="pointer" onClick={callUser} />
          )}
          {type === 'group' && user?.id === group?.owner?.id && (
            <PersonAdd
              cursor="pointer"
              size={30}
              onClick={() => setShowModal(true)}
            />
          )}
          {type === 'group' && (
            <PeopleGroup
              cursor="pointer"
              size={30}
              onClick={() => dispatch(toggleSidebar())}
            />
          )}
        </GroupHeaderIcons>
      </MessagePanelHeaderStyle>
    </>
  );
};
