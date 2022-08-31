import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../../components/conversations/ConversationSidebar';
import { AppDispatch } from '../../store';
import { fetchGroupsThunk } from '../../store/groupSlice';
import { updateType } from '../../store/selectedSlice';
import { SocketContext } from '../../utils/context/SocketContext';
import { Page } from '../../utils/styles';

export const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupsThunk());
  }, []);

  useEffect(() => {
    // socket.on('onMessage', (payload: MessageEventPayload) => {
    //   console.log('Message Received');
    //   const { conversation, message } = payload;
    //   console.log(conversation, message);
    // });
  }, [id]);

  return (
    <Page>
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
