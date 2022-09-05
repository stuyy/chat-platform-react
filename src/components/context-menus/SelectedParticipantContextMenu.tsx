import { Icon } from 'akar-icons';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { selectGroupById } from '../../store/groupSlice';
import { userContextMenuItems } from '../../utils/constants';
import { AuthContext } from '../../utils/context/AuthContext';
import {
  getUserContextMenuActions,
  getUserContextMenuIcon,
} from '../../utils/helpers';
import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { UserContextMenuActionType } from '../../utils/types';

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
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  return (
    <ContextMenu top={points.y} left={points.x}>
      {getUserContextMenuActions(user, group).map((item) => (
        <ContextMenuItem>
          <CustomIcon type={item.action} />
          <span style={{ color: item.color }}>{item.label}</span>
        </ContextMenuItem>
      ))}
    </ContextMenu>
  );
};
