import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateGroupDetailsThunk } from '../../store/groupSlice';
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
  const [file, setFile] = useState<File>();
  const group = useSelector(
    (state: RootState) => state.groups.selectedGroupContextMenu
  );
  const dispatch = useDispatch<AppDispatch>();
  const [newGroupTitle, setNewGroupName] = useState(group?.title || '');
  const isStateChanged = () => file || group?.title !== newGroupTitle;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!group) throw new Error('Group Undefined');
    const formData = new FormData();
    file && formData.append('avatar', file);
    newGroupTitle &&
      group.title !== newGroupTitle &&
      formData.append('title', newGroupTitle);
    dispatch(updateGroupDetailsThunk({ id: group.id, data: formData }));
  };

  return (
    <Form onSubmit={onSubmit}>
      <GroupAvatarUpload setFile={setFile} />
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="groupName">Group Name</InputLabel>
        <InputField
          id="groupName"
          value={newGroupTitle}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
      </InputContainer>
      <Button style={{ margin: '10px 0' }} disabled={!isStateChanged()}>
        Save
      </Button>
    </Form>
  );
};
