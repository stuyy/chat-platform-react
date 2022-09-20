import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CallReceiveDialogContainer } from '../../utils/styles';
import { UserAvatar } from '../users/UserAvatar';
import { MdCall, MdCallEnd } from 'react-icons/md';
import { HandleCallType } from '../../utils/types';
import { useContext } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import { SenderEvents, WebsocketEvents } from '../../utils/constants';

export const CallReceiveDialog = () => {
  const { caller, callType } = useSelector((state: RootState) => state.call);
  const socket = useContext(SocketContext);
  const handleCall = (type: HandleCallType) => {
    const payload = { caller };
    switch (type) {
      case 'accept':
        return callType === 'video'
          ? socket.emit('videoCallAccepted', payload)
          : socket.emit(SenderEvents.VOICE_CALL_ACCEPT, payload);
      case 'reject':
        return callType === 'video'
          ? socket.emit(WebsocketEvents.VIDEO_CALL_REJECTED, payload)
          : socket.emit(WebsocketEvents.VOICE_CALL_REJECTED, payload);
    }
  };
  return (
    <CallReceiveDialogContainer>
      <UserAvatar user={caller!} />
      <div className="content">
        <span>
          {caller!.username} wants to {callType === 'audio' ? 'voice' : 'video'}{' '}
          call you
        </span>
      </div>
      <div className="icons">
        <div className="accept" onClick={() => handleCall('accept')}>
          <MdCall />
        </div>
        <div className="reject" onClick={() => handleCall('reject')}>
          <MdCallEnd />
        </div>
      </div>
    </CallReceiveDialogContainer>
  );
};
