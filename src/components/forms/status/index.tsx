import { useState, useContext } from 'react';
import { AuthContext } from '../../../utils/context/AuthContext';
import {
  InputContainer,
  InputContainerHeader,
  InputField,
  InputLabel,
} from '../../../utils/styles';
import { Button } from '../../../utils/styles/button';
import styles from '../index.module.scss';

export const UpdateUserStatusForm = () => {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState(user?.presence?.statusMessage || '');

  const saveStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updating Status...');
  };

  return (
    <form className={styles.updateUserStatusForm} onSubmit={saveStatus}>
      <InputContainer backgroundColor="#0A0A0A">
        <InputContainerHeader>
          <InputLabel htmlFor="message">Message</InputLabel>
        </InputContainerHeader>
        <InputField
          type="test"
          id="message"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </InputContainer>
      <div className={styles.updateStatusFormButtons}>
        <Button size="md">Save</Button>
      </div>
    </form>
  );
};
