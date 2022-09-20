import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ConversationCallContainer,
  MediaContainer,
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
import { SocketContext } from '../../utils/context/SocketContext';

export const ConversationVideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = useContext(SocketContext);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const { localStream, remoteStream, caller, receiver } = useSelector(
    (state: RootState) => state.call
  );
  useEffect(() => {
    console.log('local stream was updated...');
    console.log(localStream);
    if (localVideoRef.current && localStream) {
      console.log('updating local video ref');
      console.log(`Updating local stream ${localStream.id}`);
      localVideoRef.current.srcObject = localStream;
      localVideoRef.current.muted = true;
    }
  }, [localStream]);
  useEffect(() => {
    console.log('remote stream was updated...');
    console.log(remoteStream);
    if (remoteVideoRef.current && remoteStream) {
      console.log('updating remote video ref');
      console.log(`Updating remote stream ${remoteStream.id}`);
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const toggleMicrophone = () =>
    localStream &&
    setMicrophoneEnabled((prev) => {
      localStream.getAudioTracks()[0].enabled = !prev;
      return !prev;
    });

  const toggleVideo = () =>
    localStream &&
    setVideoEnabled((prev) => {
      localStream.getVideoTracks()[0].enabled = !prev;
      return !prev;
    });

  const closeCall = () => {
    socket.emit('videoCallHangUp', { caller, receiver });
  };

  return (
    <ConversationCallContainer>
      <MediaContainer>
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
      </MediaContainer>
      <VideoContainerActionButtons>
        <div>
          {videoEnabled ? (
            <BiVideo onClick={toggleVideo} />
          ) : (
            <BiVideoOff onClick={toggleVideo} />
          )}
        </div>
        <div>
          {microphoneEnabled ? (
            <BiMicrophone onClick={toggleMicrophone} />
          ) : (
            <BiMicrophoneOff onClick={toggleMicrophone} />
          )}
        </div>
        <div>
          <ImPhoneHangUp onClick={closeCall} />
        </div>
      </VideoContainerActionButtons>
    </ConversationCallContainer>
  );
};
