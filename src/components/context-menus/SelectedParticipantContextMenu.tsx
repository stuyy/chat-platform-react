import { FC } from 'react';
import { ContextMenuStyle } from '../../utils/styles';

type Props = {
  points: { x: number; y: number };
};

export const SelectedParticipantContextMenu: FC<Props> = ({ points }) => {
  return (
    <ContextMenuStyle top={points.y} left={points.x}>
      <ul>
        <li>Kick User</li>
        <li>Ban User</li>
        <li>Mute User</li>
        <li>Transfer Owner</li>
      </ul>
    </ContextMenuStyle>
  );
};
