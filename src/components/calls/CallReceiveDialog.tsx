import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CallReceiveDialogContainer } from '../../utils/styles';
import { UserAvatar } from '../users/UserAvatar';
import { MdCall, MdCallEnd } from 'react-icons/md';
import { HandleCallType } from '../../utils/types';
import { useContext } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import { SenderEvents } from '../../utils/constants';

export const CallReceiveDialog = () => {
  const { caller, callType } = useSelector((state: RootState) => state.call);
  const socket = useContext(SocketContext);
  const handleCall = (type: HandleCallType) => {
    switch (type) {
      case 'accept':
        return callType === 'video'
          ? socket.emit('videoCallAccepted', { caller })
          : socket.emit(SenderEvents.VOICE_CALL_ACCEPT, { caller });
      case 'reject':
        return socket.emit('videoCallRejected', { caller });
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
