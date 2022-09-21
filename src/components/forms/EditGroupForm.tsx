import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  setIsSavingChanges,
  setShowEditGroupModal,
  updateGroupDetailsThunk,
} from '../../store/groupSlice';
import { useToast } from '../../utils/hooks/useToast';
import {
  Button,
  Form,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import { FormEvent } from '../../utils/types';
import { GroupAvatarUpload } from '../avatars/GroupAvatarUpload';

export const EditGroupForm = () => {
  const { selectedGroupContextMenu: group, isSavingChanges } = useSelector(
    (state: RootState) => state.groups
  );
  const dispatch = useDispatch<AppDispatch>();
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File>();
  const [newGroupTitle, setNewGroupName] = useState(group?.title || '');
  const { success, error } = useToast({ theme: 'dark' });
  const isStateChanged = () => file || group?.title !== newGroupTitle;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!group) throw new Error('Group Undefined');
    const formData = new FormData();
    file && formData.append('avatar', file);
    newGroupTitle &&
      group.title !== newGroupTitle &&
      formData.append('title', newGroupTitle);
    dispatch(setIsSavingChanges(true));
    dispatch(updateGroupDetailsThunk({ id: group.id, data: formData }))
      .then(() => {
        dispatch(setShowEditGroupModal(false));
        success('Group Details Updated!');
      })
      .catch((err) => {
        console.log(err);
        error('Error Saving Changes. Try again.');
      })
      .finally(() => dispatch(setIsSavingChanges(false)));
  };

  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      <GroupAvatarUpload setFile={setFile} />
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="groupName">Group Name</InputLabel>
        <InputField
          id="groupName"
          value={newGroupTitle}
          onChange={(e) => setNewGroupName(e.target.value)}
          disabled={isSavingChanges}
        />
      </InputContainer>
      <Button
        style={{ margin: '10px 0' }}
        disabled={!isStateChanged() || isSavingChanges}
      >
        Save
      </Button>
    </Form>
  );
};
