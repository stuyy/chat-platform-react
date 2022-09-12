import { FC, Dispatch, SetStateAction } from 'react';
import { SelectedRecipientPillStyle } from '../../utils/styles';
import { User } from '../../utils/types';
import { CircleX } from 'akar-icons';

type Props = {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};

export const SelectedRecipientChip: FC<Props> = ({ user, setSelectedUser }) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.username}</span>
        <CircleX
          className="icon"
          size={20}
          onClick={() => {
            setSelectedUser(undefined);
          }}
        />
      </div>
    </SelectedRecipientPillStyle>
  );
};
