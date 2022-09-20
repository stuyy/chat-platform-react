import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PersonAdd, PeopleGroup } from 'akar-icons';
import { RootState, AppDispatch } from '../../../store';
import { toggleSidebar } from '../../../store/groupRecipientsSidebarSlice';
import { selectGroupById } from '../../../store/groupSlice';
import { AuthContext } from '../../../utils/context/AuthContext';
import {
  MessagePanelHeaderStyle,
  MessagePanelHeaderIcons,
} from '../../../utils/styles';
import { AddGroupRecipientModal } from '../../modals/AddGroupRecipientModal';

export const MessagePanelGroupHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useContext(AuthContext).user!;
  const { id } = useParams();
  const group = useSelector((state: RootState) =>
    selectGroupById(state, parseInt(id!))
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {showModal && (
        <AddGroupRecipientModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <MessagePanelHeaderStyle>
        <div>
          <span>{group?.title || 'Group'}</span>
        </div>
        <MessagePanelHeaderIcons>
          {user?.id === group?.owner?.id && (
            <PersonAdd
              cursor="pointer"
              size={30}
              onClick={() => setShowModal(true)}
            />
          )}
          <PeopleGroup
            cursor="pointer"
            size={30}
            onClick={() => dispatch(toggleSidebar())}
          />
        </MessagePanelHeaderIcons>
      </MessagePanelHeaderStyle>
    </>
  );
};
