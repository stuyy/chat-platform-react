import {
  GroupRecipientSidebarItem,
  GroupRecipientSidebarItemContainer,
  GroupRecipientsSidebarHeader,
  GroupRecipientsSidebarStyle,
  MessageItemAvatar,
} from '../../utils/styles';
import { PeopleGroup } from 'akar-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectGroupById } from '../../store/groupSlice';
import { useParams } from 'react-router-dom';

export const GroupRecipientsSidebar = () => {
  const { id } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );

  return (
    <GroupRecipientsSidebarStyle>
      <GroupRecipientsSidebarHeader>
        <span>Participants</span>
        <PeopleGroup />
      </GroupRecipientsSidebarHeader>
      <GroupRecipientSidebarItemContainer>
        {group?.users.map((user) => (
          <GroupRecipientSidebarItem>
            <MessageItemAvatar />
            <span>{user.firstName}</span>
          </GroupRecipientSidebarItem>
        ))}
      </GroupRecipientSidebarItemContainer>
    </GroupRecipientsSidebarStyle>
  );
};
