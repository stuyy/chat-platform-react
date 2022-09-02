import { FC, Dispatch, SetStateAction } from 'react';
import {
  InputContainer,
  InputLabel,
  InputField,
  RecipientChipContainer,
} from '../../utils/styles';
import { ConversationType, User } from '../../utils/types';
import { SelectedRecipientChip } from './SelectedRecipientChip';

type Props = {
  selectedUser: User | undefined;
  selectedUsers: User[];
  setQuery: Dispatch<SetStateAction<string>>;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  type: ConversationType;
};

export const RecipientField: FC<Props> = ({
  selectedUser,
  selectedUsers,
  setQuery,
  setSelectedUser,
  setSelectedUsers,
  type,
}) => {
  const renderRecipients = () => {
    if (!selectedUser && selectedUsers.length === 0)
      return <InputField onChange={(e) => setQuery(e.target.value)} />;

    if (type === 'private' && selectedUser)
      return (
        <SelectedRecipientChip
          user={selectedUser}
          type={type}
          setSelectedUser={setSelectedUser}
          setSelectedUsers={setSelectedUsers}
        />
      );

    return selectedUsers.map((user) => (
      <SelectedRecipientChip
        user={user}
        type={type}
        setSelectedUser={setSelectedUser}
        setSelectedUsers={setSelectedUsers}
      />
    ));
  };

  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <RecipientChipContainer>{renderRecipients()}</RecipientChipContainer>
      </InputContainer>
    </section>
  );
};
