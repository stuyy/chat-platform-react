import { useContext, useState } from 'react';
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
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { getRecipientFromConversation } from '../../utils/helpers';
import {
  initiateCallState,
  setActiveConversationId,
  setCaller,
  setIsCalling,
  setLocalStream,
  setReceiver,
} from '../../store/call/callSlice';
import { SocketContext } from '../../utils/context/SocketContext';
import { SenderEvents } from '../../utils/constants';
import { CallInitiatePayload, CallType } from '../../utils/types';

export const MessagePanelHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(AuthContext).user!;
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

  const videoCallUser = async () => {
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

  const voiceCallUser = async () => {
    if (!recipient) return console.log('Recipient undefined');
    socket.emit(SenderEvents.VOICE_CALL_INITIATE, {
      conversation: conversation!.id,
      recipientId: recipient.id,
    });
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    const payload: CallInitiatePayload = {
      localStream: stream,
      activeConversationId: conversation!.id,
      isCalling: true,
      caller: user,
      receiver: recipient,
      type: 'audio',
    };
    dispatch(initiateCallState(payload));
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
            <FaPhoneAlt size={24} cursor="pointer" onClick={voiceCallUser} />
          )}
          {type === 'private' && (
            <FaVideo size={30} cursor="pointer" onClick={videoCallUser} />
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
