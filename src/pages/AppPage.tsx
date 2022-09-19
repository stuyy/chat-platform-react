import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserSidebar } from '../components/sidebars/UserSidebar';
import { AppDispatch, RootState } from '../store';
import {
  addFriendRequest,
  removeFriendRequest,
} from '../store/friends/friendsSlice';
import { SocketContext } from '../utils/context/SocketContext';
import { useToast } from '../utils/hooks/useToast';
import { LayoutPage } from '../utils/styles';
import {
  AcceptedVideoCallPayload,
  AcceptFriendRequestResponse,
  FriendRequest,
  SelectableTheme,
  VideoCallPayload,
} from '../utils/types';
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { fetchFriendRequestThunk } from '../store/friends/friendsThunk';
import { ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from '../utils/themes';
import Peer from 'peerjs';
import { AuthContext } from '../utils/context/AuthContext';
import {
  setActiveConversationId,
  setCall,
  setCaller,
  setConnection,
  setIsCallInProgress,
  setIsReceivingCall,
  setLocalStream,
  setPeer,
  setReceiver,
  setRemoteStream,
} from '../store/call/callSlice';
import { CallReceiveDialog } from '../components/calls/CallReceiveDialog';
import { useVideoCallRejected } from '../utils/hooks/sockets/useVideoCallRejected';
import { useVideoCallHangUp } from '../utils/hooks/sockets/useVideoCallHangUp';

export const AppPage = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { peer, call, isReceivingCall, caller, connection, localStream } =
    useSelector((state: RootState) => state.call);
  const { info } = useToast({ theme: 'dark' });
  const storageTheme = localStorage.getItem('theme') as SelectableTheme;
  const { theme } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    dispatch(fetchFriendRequestThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    const newPeer = new Peer(user.peer.id);
    dispatch(setPeer(newPeer));
  }, []);

  useEffect(() => {
    console.log('Registering all events for AppPage');
    socket.on('onFriendRequestReceived', (payload: FriendRequest) => {
      console.log('onFriendRequestReceived');
      console.log(payload);
      dispatch(addFriendRequest(payload));
      info(`Incoming Friend Request from ${payload.sender.firstName}`, {
        position: 'bottom-left',
        icon: IoMdPersonAdd,
        onClick: () => navigate('/friends/requests'),
      });
    });

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

    socket.on('onVideoCall', (data: VideoCallPayload) => {
      console.log('receiving video call....');
      console.log(data);
      if (isReceivingCall) return;
      dispatch(setCaller(data.caller));
      dispatch(setReceiver(user!));
      dispatch(setIsReceivingCall(true));
      // dispatch(setActiveConversationId(data.conversationId));
    });

    return () => {
      console.log('Removing all event listeners');
      socket.off('onFriendRequestCancelled');
      socket.off('onFriendRequestRejected');
      socket.off('onFriendRequestReceived');
      socket.off('onFriendRequestAccepted');
      socket.off('onVideoCall');
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
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Receiving Call & Got Local Stream:', stream.id);
      incomingCall.answer(stream);
      dispatch(setLocalStream(stream));
      dispatch(setCall(incomingCall));
    });
  }, [peer, dispatch]);

  useEffect(() => {
    if (!call) return;
    call.on('stream', (remoteStream) => {
      console.log('Stream Was Received from Remote Peer');
      console.log('the remote stream:', remoteStream.id);
      dispatch(setRemoteStream(remoteStream));
    });
    call.on('close', () => console.log('call was closed'));
    return () => {
      call.off('stream');
      call.off('close');
    };
  }, [call]);

  /**
   * This useEffect will only trigger logic for the person who initiated
   * the call. It will start a peer connection with the person who already
   * accepted the call.
   */
  useEffect(() => {
    socket.on('onVideoCallAccept', (data: AcceptedVideoCallPayload) => {
      dispatch(setIsCallInProgress(true));
      dispatch(setIsReceivingCall(false));
      if (!peer) return console.log('No peer....');
      if (data.caller.id === user!.id) {
        console.log(peer.id);
        const connection = peer.connect(data.acceptor.peer.id);
        dispatch(setConnection(connection));
        if (!connection) return console.log('No connection');
        if (localStream) {
          console.log('local stream for caller exists!');
          console.log('My local stream:', localStream.id);
          const newCall = peer.call(data.acceptor.peer.id, localStream);
          dispatch(setCall(newCall));
        }
      }
    });

    return () => {
      socket.off('onVideoCallAccept');
    };
  }, [localStream, peer]);

  useVideoCallRejected();
  useVideoCallHangUp();

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
