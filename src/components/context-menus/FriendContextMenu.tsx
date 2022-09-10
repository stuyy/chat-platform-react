import { useContext } from 'react';
import { MdPersonRemove, MdOutlineTextsms } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { toggleContextMenu } from '../../store/friends/friendsSlice';
import { removeFriendThunk } from '../../store/friends/friendsThunk';
import { SocketContext } from '../../utils/context/SocketContext';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';

export const FriendContextMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { points, selectedFriendContextMenu } = useSelector(
    (state: RootState) => state.friends
  );
  const socket = useContext(SocketContext);

  const removeFriend = () => {
    if (!selectedFriendContextMenu) return;
    dispatch(toggleContextMenu(false));
    dispatch(removeFriendThunk(selectedFriendContextMenu.id)).then(() =>
      socket.emit('getOnlineFriends')
    );
  };

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem onClick={removeFriend}>
        <MdPersonRemove size={20} color="#ff0000" />
        <span style={{ color: '#ff0000' }}>Remove Friend</span>
      </ContextMenuItem>
      <ContextMenuItem>
        <MdOutlineTextsms size={20} color="#fff" />
        <span style={{ color: '#fff' }}>Message</span>
      </ContextMenuItem>
    </ContextMenu>
  );
};
