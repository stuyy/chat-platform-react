import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addGroupRecipient } from '../../utils/api';
import { useToast } from '../../utils/hooks/useToast';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';

export const GroupRecipientAddForm = () => {
  const { id: groupId } = useParams();
  const [email, setEmail] = useState('');
  const { success, error } = useToast({ theme: 'dark' });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGroupRecipient({ id: parseInt(groupId!), email })
      .then(({ data }) => {
        console.log(data);
        success('Recipient Added to Group');
        setEmail('');
      })
      .catch((err) => {
        console.log(err);
        error('Failed to add user');
      });
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <Button style={{ margin: '10px 0' }} disabled={!email}>
        Add Recipient
      </Button>
    </form>
  );
};
