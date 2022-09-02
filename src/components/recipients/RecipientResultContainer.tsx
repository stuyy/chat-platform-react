import { FC, Dispatch, SetStateAction } from 'react';
import {
  RecipientBottomSection,
  RecipientResultContainerStyle,
  RecipientResultItem,
  RecipientScrollableItemContainer,
} from '../../utils/styles';
import { ConversationType, User } from '../../utils/types';

type Props = {
  userResults: User[];
  type: ConversationType;
  handleUserSelect: (user: User) => void;
  handleMultipleUserSelect: (user: User) => void;
  removeAllSelectedUsers: () => void;
  saveResults: () => void;
};

export const RecipientResultContainer: FC<Props> = ({
  type,
  userResults,
  handleUserSelect,
  handleMultipleUserSelect,
  removeAllSelectedUsers,
  saveResults,
}) => {
  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem
            key={user.id}
            onClick={() =>
              type !== 'group'
                ? handleUserSelect(user)
                : handleMultipleUserSelect(user)
            }
          >
            <span>{user.email}</span>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>
      <RecipientBottomSection>
        <span onClick={() => removeAllSelectedUsers()}>cancel</span>
        <span onClick={() => saveResults()}>save</span>
      </RecipientBottomSection>
    </RecipientResultContainerStyle>
  );
};
