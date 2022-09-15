import { useState, useContext, Dispatch, SetStateAction, FC } from 'react';
import { updateStatusMessage } from '../../../utils/api';
import { AuthContext } from '../../../utils/context/AuthContext';
import { useToast } from '../../../utils/hooks/useToast';
import {
  InputContainer,
  InputContainerHeader,
  InputField,
  InputLabel,
} from '../../../utils/styles';
import { Button } from '../../../utils/styles/button';
import styles from '../index.module.scss';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const UpdateUserStatusForm: FC<Props> = ({ setShowModal }) => {
  const { user } = useContext(AuthContext);
  const { success, error } = useToast({ theme: 'dark' });
  const [statusMessage, setStatusMessage] = useState(
    user?.presence?.statusMessage || ''
  );

  const saveStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updating Status...');
    updateStatusMessage({ statusMessage })
      .then(() => {
        success('Updated Status!');
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        error('Failed to Update Status');
      });
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
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />
      </InputContainer>
      <div className={styles.updateStatusFormButtons}>
        <Button size="md">Save</Button>
      </div>
    </form>
  );
};
