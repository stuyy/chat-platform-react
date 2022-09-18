import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CallReceiveDialogContainer } from '../../utils/styles';
import { UserAvatar } from '../users/UserAvatar';
import { MdCall, MdCallEnd } from 'react-icons/md';
import { HandleCallType } from '../../utils/types';
import { useContext } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import { AuthContext } from '../../utils/context/AuthContext';

export const CallReceiveDialog = () => {
  const { caller } = useSelector((state: RootState) => state.call);
  const socket = useContext(SocketContext);
  const handleCall = (type: HandleCallType) => {
    switch (type) {
      case 'accept': {
        socket.emit('videoCallAccepted', { caller });
        return;
      }
      case 'reject':
        return;
    }
  };
  return (
    <CallReceiveDialogContainer>
      <UserAvatar user={caller!} />
      <div className="content">
        <span>{caller!.username} wants to calladasdasdsadsadsadsadad you</span>
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
