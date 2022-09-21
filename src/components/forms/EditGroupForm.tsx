import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  Button,
  Form,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import { GroupAvatarUpload } from '../avatars/GroupAvatarUpload';

export const EditGroupForm = () => {
  const [file, setFile] = useState<File>();
  const group = useSelector(
    (state: RootState) => state.groups.selectedGroupContextMenu
  );
  const [groupName, setGroupName] = useState(group?.title || '');
    
  return (
    <Form>
      <GroupAvatarUpload setFile={setFile} />
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="groupName">Group Name</InputLabel>
        <InputField
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </InputContainer>
      <Button style={{ margin: '10px 0' }}>Save</Button>
    </Form>
  );
};
