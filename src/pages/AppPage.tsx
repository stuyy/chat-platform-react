import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserSidebar } from '../components/sidebars/UserSidebar';
import { AppDispatch, RootState } from '../store';
import { removeFriendRequest } from '../store/friends/friendsSlice';
import { SocketContext } from '../utils/context/SocketContext';
import { useToast } from '../utils/hooks/useToast';
import { LayoutPage } from '../utils/styles';
import {
  AcceptFriendRequestResponse,
  FriendRequest,
  SelectableTheme,
} from '../utils/types';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { fetchFriendRequestThunk } from '../store/friends/friendsThunk';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from '../utils/themes';
import Peer from 'peerjs';
import { AuthContext } from '../utils/context/AuthContext';
import {
  setCall,
  setLocalStream,
  setPeer,
  setRemoteStream,
} from '../store/call/callSlice';
import { CallReceiveDialog } from '../components/calls/CallReceiveDialog';
import { useVideoCallRejected } from '../utils/hooks/sockets/useVideoCallRejected';
import { useVideoCallHangUp } from '../utils/hooks/sockets/useVideoCallHangUp';
import { useVideoCallAccept } from '../utils/hooks/sockets/useVideoCallAccept';
import { useFriendRequestReceived } from '../utils/hooks/sockets/friend-requests/useFriendRequestReceived';
import { useVideoCall } from '../utils/hooks/sockets/call/useVideoCall';
import { useVoiceCall } from '../utils/hooks/sockets/call/useVoiceCall';
import { useVoiceCallAccepted } from '../utils/hooks/sockets/call/useVoiceCallAccepted';
import { useVoiceCallHangUp } from '../utils/hooks/sockets/call/useVoiceCallHangUp';
import { useVoiceCallRejected } from '../utils/hooks/sockets/call/useVoiceCallRejected';

export const AppPage = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { peer, call, isReceivingCall, caller, connection, callType } =
    useSelector((state: RootState) => state.call);
  const { info } = useToast({ theme: 'dark' });
  const { theme } = useSelector((state: RootState) => state.settings);
  const storageTheme = localStorage.getItem('theme') as SelectableTheme;
  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    const newPeer = new Peer(user.peer.id, {
      config: {
        iceServers: [
          {
            url: 'stun:stun.l.google.com:19302',
          },
          {
            url: 'stun:stun1.l.google.com:19302',
          },
        ],
      },
    });
    dispatch(setPeer(newPeer));
  }, []);

  useFriendRequestReceived();
  useVideoCall();

  useEffect(() => {
    console.log('Registering all events for AppPage');
    socket.on('onFriendRequestCancelled', (payload: FriendRequest) => {
      console.log('onFriendRequestCancelled');
      console.log(payload);
      dispatch(removeFriendRequest(payload));
    });
    socket.on(
      'onFriendRequestAccepted',
      (payload: AcceptFriendRequestResponse) => {
        console.log('onFriendRequestAccepted');
        dispatch(removeFriendRequest(payload.friendRequest));
        socket.emit('getOnlineFriends');
        info(
          `${payload.friendRequest.receiver.firstName} accepted your friend request`,
          {
            position: 'bottom-left',
            icon: BsFillPersonCheckFill,
            onClick: () => navigate('/friends'),
          }
        );
      }
    );

    socket.on('onFriendRequestRejected', (payload: FriendRequest) => {
      console.log('onFriendRequestRejected');
      dispatch(removeFriendRequest(payload));
    });

    return () => {
      socket.off('onFriendRequestCancelled');
      socket.off('onFriendRequestRejected');
      socket.off('onFriendRequestReceived');
      socket.off('onFriendRequestAccepted');
    };
  }, [socket, isReceivingCall]);

  /**
   * This useEffect hook is for the user who is receiving the call.
   * So we must dispatch the appropriate actions to set the state
   * for the user receiving the call.
   *
   * The user who is calling will have its own instance of MediaConnection/Call
   */
  useEffect(() => {
    if (!peer) return;
    peer.on('call', async (incomingCall) => {
      console.log('Incoming Call!!!!!');
      console.log(callType);
      const constraints = { video: callType === 'video', audio: true };
      console.log(constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Receiving Call & Got Local Stream:', stream.id);
      incomingCall.answer(stream);
      dispatch(setLocalStream(stream));
      dispatch(setCall(incomingCall));
    });
    return () => {
      peer.off('call');
    };
  }, [peer, callType, dispatch]);

  useEffect(() => {
    if (!call) return;
    call.on('stream', (remoteStream) =>
      dispatch(setRemoteStream(remoteStream))
    );
    call.on('close', () => console.log('call was closed'));
    return () => {
      call.off('stream');
      call.off('close');
    };
  }, [call]);

  useVideoCallAccept();
  useVideoCallRejected();
  useVideoCallHangUp();
  useVoiceCall();
  useVoiceCallAccepted();
  useVoiceCallHangUp();
  useVoiceCallRejected();

  useEffect(() => {
    if (connection) {
      console.log('connection is defined....');
      if (connection) {
        console.log('connection is defined...');
        connection.on('open', () => {
          console.log('connection was opened');
        });
        connection.on('error', () => {
          console.log('an error has occured');
        });
        connection.on('data', (data) => {
          console.log('data received', data);
        });
        connection.on('close', () => {
          console.log('connection closed');
        });
      }
      return () => {
        connection?.off('open');
        connection?.off('error');
        connection?.off('data');
      };
    }
  }, [connection]);

  return (
    <ThemeProvider
      theme={
        storageTheme
          ? storageTheme === 'dark'
            ? DarkTheme
            : LightTheme
          : theme === 'dark'
          ? DarkTheme
          : LightTheme
      }
    >
      {isReceivingCall && caller && <CallReceiveDialog />}
      <LayoutPage>
        <UserSidebar />
        <Outlet />
      </LayoutPage>
    </ThemeProvider>
  );
};
