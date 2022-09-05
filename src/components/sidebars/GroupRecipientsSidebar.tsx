import {
  GroupRecipientSidebarItem,
  GroupRecipientSidebarItemContainer,
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarStyle,
  MessageItemAvatar,
} from '../../utils/styles';
import { PeopleGroup } from 'akar-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectGroupById } from '../../store/groupSlice';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../utils/context/SocketContext';
import { User } from '../../utils/types';

export const GroupRecipientsSidebar = () => {
  const { id: groupId } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(groupId!))
  );
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [offlineUsers, setOfflineUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.emit('getOnlineGroupUsers', { groupId });
    const interval = setInterval(() => {
      console.log(`Pinging Group ${groupId}`);
      socket.emit('getOnlineGroupUsers', { groupId });
    }, 10000);
    socket.on('onlineGroupUsersReceived', (payload) => {
      console.log('received payload for online users');
      console.log(payload);
      console.log(group?.users);
      setOnlineUsers(payload.onlineUsers);
      setOfflineUsers(payload.offlineUsers);
    });
    return () => {
      console.log('Clearing Interval for GroupRecipientsSidebar');
      clearInterval(interval);
      socket.off('onlineGroupUsersReceived');
    };
  }, [group, groupId]);

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
      </GroupRecipientsSidebarHeader>
      <GroupRecipientSidebarItemContainer>
        <span>Online Users</span>
        {onlineUsers.map((user) => (
          <GroupRecipientSidebarItem>
            <MessageItemAvatar />
            <span>{user.firstName}</span>
          </GroupRecipientSidebarItem>
        ))}
        <span>Offline Users</span>
        {group?.users
          .filter(
            (user) =>
              !onlineUsers.find((onlineUser) => onlineUser.id === user.id)
          )
          .map((user) => (
            <GroupRecipientSidebarItem>
              <MessageItemAvatar />
              <span>{user.firstName}</span>
            </GroupRecipientSidebarItem>
          ))}
      </GroupRecipientSidebarItemContainer>
    </GroupRecipientsSidebarStyle>
  );
};
