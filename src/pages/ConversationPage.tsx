import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../components/conversations/ConversationSidebar';
import { AppDispatch, RootState } from '../store';
import {
  addConversation,
  fetchConversationsThunk,
  updateConversation,
} from '../store/conversationSlice';
import { fetchGroupsThunk } from '../store/groupSlice';
import { addMessage, deleteMessage } from '../store/messageSlice';
import { SocketContext } from '../utils/context/SocketContext';
import { Page } from '../utils/styles';
import { Conversation, DeleteMessageResponse, MessageEventPayload } from '../utils/types';

type SocketPayloadMap = {
  onMessage: MessageEventPayload,
  onConversation: Conversation,
  onMessageDelete: DeleteMessageResponse
}

const useSocket = <K extends keyof SocketPayloadMap>(event: K, listener: (payload: SocketPayloadMap[K]) => void) => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(event as string, listener)
    return () => {
      socket.off(event as string, listener)
    }
  }, [socket, event, listener])
}

export const ConversationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(fetchConversationsThunk());
    dispatch(fetchGroupsThunk());
  }, []);

  useSocket('onMessage', (payload) => {
    const { conversation, message } = payload;
    console.log(conversation, message);
    dispatch(addMessage(payload));
    dispatch(updateConversation(conversation));
  })
  useSocket('onConversation', (payload) => {
    console.log('Received onConversation Event');
    console.log(payload);
    dispatch(addConversation(payload));
  })
  useSocket('onMessageDelete', (payload) => {
    console.log('Message Deleted');
    console.log(payload);
    dispatch(deleteMessage(payload));
  })

  useEffect(() => {
    return () => {
      socket.off('connected'); // NOT SURE WHAT THIS IS SORRY
    };
  }, [id]);

  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
