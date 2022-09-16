import {
  GroupRecipientSidebarItemContainer,
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarStyle,
} from '../../../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { selectGroupById } from '../../../store/groupSlice';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../utils/context/SocketContext';
import { User } from '../../../utils/types';
import {
  setContextMenuLocation,
  setSelectedUser,
  toggleContextMenu,
} from '../../../store/groupRecipientsSidebarSlice';
import { SelectedParticipantContextMenu } from '../../context-menus/SelectedParticipantContextMenu';
import { OnlineGroupRecipients } from './OnlineGroupRecipients';
import { OfflineGroupRecipients } from './OfflineGroupRecipients';

export const GroupRecipientsSidebar = () => {
  const { id: groupId } = useParams();

  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );
  const groupSidebarState = useSelector(
    (state: RootState) => state.groupSidebar
  );

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [groupId]);

  useEffect(() => {
    socket.emit('getOnlineGroupUsers', { groupId });
    const interval = setInterval(() => {
      socket.emit('getOnlineGroupUsers', { groupId });
    }, 5000);
    socket.on('onlineGroupUsersReceived', (payload) => {
      console.log('received onlineGroupUsersReceived event');
      console.log(payload);
      setOnlineUsers(payload.onlineUsers);
    });
    return () => {
      console.log('Clearing Interval for GroupRecipientsSidebar');
      clearInterval(interval);
      socket.off('onlineGroupUsersReceived');
    };
  }, [group, groupId]);

  useEffect(() => {
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onUserContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: User
  ) => {
    e.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedUser(user));
  };

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
      </GroupRecipientsSidebarHeader>
      <GroupRecipientSidebarItemContainer>
        <span>Online Users</span>
        <OnlineGroupRecipients
          users={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        <span>Offline Users</span>
        <OfflineGroupRecipients
          onlineUsers={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        {groupSidebarState.showUserContextMenu && (
          <SelectedParticipantContextMenu points={groupSidebarState.points} />
        )}
      </GroupRecipientSidebarItemContainer>
    </GroupRecipientsSidebarStyle>
  );
};
