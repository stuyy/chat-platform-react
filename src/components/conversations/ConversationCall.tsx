import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ConversationCallContainer } from '../../utils/styles';

export const ConversationCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { localStream, remoteStream } = useSelector(
    (state: RootState) => state.call
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('local stream was updated...');
    if (localVideoRef.current && localStream) {
      console.log('updating local video ref');
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.play();
    }
  }, [localStream]);
  useEffect(() => {
    console.log('remote stream was updated...');
    if (remoteVideoRef.current && remoteStream) {
      console.log('updating remote video ref');
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current.play();
    }
  }, [remoteStream]);

  return (
    <ConversationCallContainer>
      <div>
        <div>
          <span>You</span>
        </div>
        <video ref={localVideoRef} width={400} height={400} />
      </div>
      <div>
        <div>
          <span>Recipient</span>
        </div>
        <video ref={remoteVideoRef} width={400} height={400} />
      </div>
    </ConversationCallContainer>
  );
};
