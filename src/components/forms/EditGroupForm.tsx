import {
  Button,
  Form,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import { GroupAvatarUpload } from '../avatars/GroupAvatarUpload';

export const EditGroupForm = () => {
  return (
    <Form>
      <GroupAvatarUpload />
      <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="groupName">Group Name</InputLabel>
        <InputField id="groupName" />
      </InputContainer>
      <Button style={{ margin: '10px 0' }}>Save</Button>
    </Form>
  );
};
