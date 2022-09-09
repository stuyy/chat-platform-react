import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createFriendRequestThunk } from '../../store/friends/friendsThunk';
import { useToast } from '../../utils/hooks/useToast';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const SendFriendRequestForm: FC<Props> = ({ setShowModal }) => {
  const [email, setEmail] = useState('');
  const { success, error } = useToast({ theme: 'dark' });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createFriendRequestThunk(email))
      .then(() => {
        setShowModal(false);
        success('Friend Request Sent!');
      })
      .catch((err) => {
        error('Error sending friend request');
      });
  };

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <Button style={{ margin: '10px 0' }} disabled={!email}>
        Send
      </Button>
    </form>
  );
};
