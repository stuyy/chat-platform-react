import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  ScrollableContainer,
  SidebarHeader,
  SidebarStyle,
} from '../../../utils/styles';
import { CallSidebarItem } from '../../calls/CallSidebarItem';

export const CallsSidebar = () => {
  const { friends } = useSelector((state: RootState) => state.friends);
  return (
    <SidebarStyle>
      <SidebarHeader>Friends</SidebarHeader>
      <ScrollableContainer>
        {friends.map((friend) => (
          <CallSidebarItem friend={friend} />
        ))}
      </ScrollableContainer>
    </SidebarStyle>
  );
};
