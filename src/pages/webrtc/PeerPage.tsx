import { MediaConnection, Peer } from 'peerjs';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { OverlayStyle } from '../../utils/styles';

const randomPeerId = uuidv4();

export const PeerPage = () => {
  const { user } = useContext(AuthContext);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localScreenShareVideoRef = useRef<HTMLVideoElement>(null);
  const [username, setUsername] = useState('');
  const [peer, setPeer] = useState<Peer>(() => new Peer(randomPeerId));
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [disableLocalVideo, setDisableLocalVideo] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [showRemoteVideo, setShowRemoteVideo] = useState(true);
  const [deafen, setDeafen] = useState(false);
  const [connectedCall, setConnectedCall] = useState<MediaConnection>();

  useEffect(() => {
    if (!peer) return;
    console.log('peer exists: ', peer.id);
    console.log(peer);
    peer.on('call', async (call) => {
      setIsReceivingCall(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(mediaStream);
      call.answer(mediaStream);
      setConnectedCall(call);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.muted = true;
        localVideoRef.current.play();
      }
      call.on('stream', (stream) => {
        console.log('Received Stream');
        console.log(stream.getTracks());
        setRemoteStream(stream);
        console.log('receiving remote stream');
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
          remoteVideoRef.current.play();
        }
        stream.onaddtrack = (e) => {
          console.log('onatrackadd');
          console.log(e);
        };
      });
    });
    peer.on('open', (id) => {
      console.log(`Peer Id: ${id}`);
    });
    peer.on('connection', () => {
      console.log('connection');
    });
  }, [localStream]);

  const connect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const connection = peer.connect(username);
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setLocalStream(mediaStream);
    if (localVideoRef.current) {
      console.log('setting local stream');
      localVideoRef.current.srcObject = mediaStream;
      localVideoRef.current.muted = true;
      localVideoRef.current.play();
    }
    const call = peer.call(username, mediaStream);
    console.log(call.peerConnection.getSenders());
    setConnectedCall(call);

    call.on('stream', (stream) => {
      setRemoteStream(stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
        remoteVideoRef.current.play();
      }
    });
  };

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

  const toggleRemoteVideo = () =>
    remoteStream &&
    setShowRemoteVideo((prev) => {
      remoteStream.getVideoTracks()[0].enabled = !prev;
      return !prev;
    });

  const deafenUser = () => {
    console.log('Deafen User');
    if (remoteStream) {
      console.log(remoteStream.getAudioTracks());
      remoteStream.getAudioTracks()[0].enabled =
        !remoteStream.getAudioTracks()[0].enabled;
    }
  };

  const shareScreen = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    console.log(stream);
    console.log(stream.getTracks());
    console.log(remoteStream);
    if (remoteStream && connectedCall) {
      console.log('Remote Stream & Connected Call are defined');
      console.log('Senders:', connectedCall.peerConnection.getSenders());
      connectedCall.peerConnection
        .getSenders()[1]
        .replaceTrack(stream.getTracks()[0]);
      remoteStream.addTrack(stream.getTracks()[0]);
    }
    if (localScreenShareVideoRef.current) {
      console.log('Playing Video for Screen Sharing');
      localScreenShareVideoRef.current.srcObject = stream;
      localScreenShareVideoRef.current.play();
    }
  };

  return (
    <div>
      {randomPeerId}
      {/* {isReceivingCall && (
        <OverlayStyle>You are receiving a call!</OverlayStyle>
      )} */}
      <form onSubmit={connect}>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Connect</button>
      </form>
      <div>
        <button onClick={shareScreen}>Share Screen</button>
        <button onClick={toggleMicrophone}>
          {microphoneEnabled ? 'Mute' : 'Unmute'}
        </button>
        <button onClick={toggleVideo}>
          {videoEnabled ? 'Turn Off Video' : 'Turn On Video'}
        </button>
        <button onClick={toggleRemoteVideo}>
          {showRemoteVideo ? 'Turn Off User Video' : 'Turn On User video'}
        </button>
        <button onClick={deafenUser}>Mute User</button>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <div>
            <span>Your Video</span>
          </div>
          <video ref={localVideoRef} width={400} height={400}></video>
        </div>
        <div>
          <div>
            <span>Remote</span>
          </div>
          <video ref={remoteVideoRef} width={400} height={400}></video>
        </div>
      </div>
      <div>
        <div>
          <span>Your Screen</span>
        </div>
        <video ref={localScreenShareVideoRef} width={400} height={400}></video>
      </div>
    </div>
  );
};
