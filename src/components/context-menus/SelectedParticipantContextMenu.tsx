import { Icon } from 'akar-icons';
import { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import {
  removeGroupRecipientThunk,
  selectGroupById,
  updateGroupOwnerThunk,
} from '../../store/groupSlice';
import { AuthContext } from '../../utils/context/AuthContext';
import { getUserContextMenuIcon, isGroupOwner } from '../../utils/helpers';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { UserContextMenuActionType } from '../../utils/types';
import { Person, PersonCross, Crown } from 'akar-icons';

type Props = {
  points: { x: number; y: number };
};

type CustomIconProps = {
  type: UserContextMenuActionType;
};

export const CustomIcon: FC<CustomIconProps> = ({ type }) => {
  const { icon: MyIcon, color } = getUserContextMenuIcon(type);
  return <MyIcon size={20} color={color} />;
};

export const SelectedParticipantContextMenu: FC<Props> = ({ points }) => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(
    (state: RootState) => state.groupSidebar.selectedUser
  );
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  const kickUser = () => {
    console.log(`Kicking User: ${selectedUser?.id}`);
    console.log(selectedUser);
    if (!selectedUser) return;
    dispatch(
      removeGroupRecipientThunk({
        id: parseInt(id!),
        userId: selectedUser.id,
      })
    );
  };

  const transferGroupOwner = () => {
    console.log(`Transfering Group Owner to ${selectedUser?.id}`);
    if (!selectedUser) return;
    dispatch(
      updateGroupOwnerThunk({ id: parseInt(id!), newOwnerId: selectedUser.id })
    );
  };

  const isOwner = isGroupOwner(user, group);

  return (
    <ContextMenu top={points.y} left={points.x}>
      <ContextMenuItem>
        <Person size={20} color="#7c7c7c" />
        <span style={{ color: '#7c7c7c' }}>Profile</span>
      </ContextMenuItem>
      {isOwner && user?.id !== selectedUser?.id && (
        <>
          <ContextMenuItem onClick={kickUser}>
            <PersonCross size={20} color="#ff0000" />
            <span style={{ color: '#ff0000' }}>Kick User</span>
          </ContextMenuItem>
          <ContextMenuItem onClick={transferGroupOwner}>
            <Crown size={20} color="#FFB800" />
            <span style={{ color: '#FFB800' }}>Transfer Owner</span>
          </ContextMenuItem>
        </>
      )}
    </ContextMenu>
  );
};
