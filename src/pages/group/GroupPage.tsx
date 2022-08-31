import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { ConversationPanel } from '../../components/conversations/ConversationPanel';
import { ConversationSidebar } from '../../components/conversations/ConversationSidebar';
import { AppDispatch } from '../../store';
import { fetchGroupsThunk } from '../../store/groupSlice';
import { updateType } from '../../store/selectedSlice';
import { Page } from '../../utils/styles';

export const GroupPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupsThunk());
  }, []);

  useEffect(() => {}, [id]);

  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
};
