import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  AudioContainerItem,
  ConversationCallContainer,
  MediaContainer,
  VideoContainerActionButtons,
} from '../../utils/styles';
import {
  BiMicrophone,
  BiMicrophoneOff,
  BiVideo,
  BiVideoOff,
} from 'react-icons/bi';
import { ImPhoneHangUp } from 'react-icons/im';
import { SocketContext } from '../../utils/context/SocketContext';
import { WebsocketEvents } from '../../utils/constants';

export const ConversationAudioCall = () => {
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const socket = useContext(SocketContext);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const { localStream, remoteStream, caller, receiver } = useSelector(
    (state: RootState) => state.call
  );
  useEffect(() => {
    console.log('AUDIO: local stream was updated...');
    console.log(localStream);
    if (localAudioRef.current && localStream) {
      console.log('AUDIO: updating local video ref');
      console.log(`AUDIO: Updating local stream ${localStream.id}`);
      localAudioRef.current.srcObject = localStream;
      localAudioRef.current.muted = true;
    }
  }, [localStream]);
  useEffect(() => {
    console.log('AUDIO: remote stream was updated...');
    console.log(remoteStream);
    if (remoteAudioRef.current && remoteStream) {
      console.log('AUDIO: updating remote video ref');
      console.log(`AUDIO: Updating remote stream ${remoteStream.id}`);
      remoteAudioRef.current.srcObject = remoteStream;
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
    socket.emit(WebsocketEvents.VOICE_CALL_HANG_UP, { caller, receiver });
  };

  return (
    <ConversationCallContainer>
      <div className="invisible"></div>
      <MediaContainer>
        {localStream && (
          <AudioContainerItem>
            <audio ref={localAudioRef} autoPlay controls />
          </AudioContainerItem>
        )}
        {remoteStream && (
          <AudioContainerItem>
            <audio ref={remoteAudioRef} autoPlay controls />
          </AudioContainerItem>
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
