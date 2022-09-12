import { CircleX } from 'akar-icons';
import { FC } from 'react';
import { SelectedRecipientPillStyle } from '../../utils/styles';
import { User } from '../../utils/types';

type Props = {
  user: User;
  removeUser: (user: User) => void;
};

export const SelectedGroupRecipientChip: FC<Props> = ({ user, removeUser }) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.username}</span>
        <CircleX className="icon" size={20} onClick={() => removeUser(user)} />
      </div>
    </SelectedRecipientPillStyle>
  );
};
