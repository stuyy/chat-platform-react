import { MdPersonRemove, MdOutlineTextsms } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';

export const FriendContextMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { points, selectedFriendContextMenu } = useSelector(
    (state: RootState) => state.friends
  );

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem>
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
