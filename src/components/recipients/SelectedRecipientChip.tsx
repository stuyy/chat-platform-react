import { FC, Dispatch, SetStateAction } from 'react';
import { SelectedRecipientPillStyle } from '../../utils/styles';
import { ConversationType, User } from '../../utils/types';
import { CircleX } from 'akar-icons';

type Props = {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  type: ConversationType;
};

export const SelectedRecipientChip: FC<Props> = ({
  user,
  type,
  setSelectedUser,
  setSelectedUsers,
}) => {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.email}</span>
        <CircleX
          className="icon"
          size={20}
          onClick={() => {
            if (type === 'private') return setSelectedUser(undefined);
            setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
          }}
        />
      </div>
    </SelectedRecipientPillStyle>
  );
};
