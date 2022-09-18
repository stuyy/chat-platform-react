import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  ConversationCallContainer,
  VideoContainer,
  VideoContainerActionButtons,
  VideoContainerItem,
} from '../../utils/styles';
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
} from 'react-icons/bi';
import { ImPhoneHangUp } from 'react-icons/im';

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
      localVideoRef.current.muted = true;
    }
  }, [localStream]);
  useEffect(() => {
    console.log('remote stream was updated...');
    if (remoteVideoRef.current && remoteStream) {
      console.log('updating remote video ref');
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <ConversationCallContainer>
      <VideoContainer>
        {localStream && (
          <VideoContainerItem>
            <video ref={localVideoRef} playsInline autoPlay />
          </VideoContainerItem>
        )}
        {remoteStream && (
          <VideoContainerItem>
            <video ref={remoteVideoRef} playsInline autoPlay />
          </VideoContainerItem>
        )}
      </VideoContainer>
      <VideoContainerActionButtons>
        <div>
          <BiVideo />
        </div>
        <div>
          <BiMicrophone />
        </div>
        <div>
          <ImPhoneHangUp />
        </div>
      </VideoContainerActionButtons>
    </ConversationCallContainer>
  );
};
