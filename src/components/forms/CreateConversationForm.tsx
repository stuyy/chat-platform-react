import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  RecipientResultContainer,
  TextField,
} from '../../utils/styles';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import {
  addConversation,
  createConversationThunk,
} from '../../store/conversationSlice';
import { useForm } from 'react-hook-form';
import {
  ConversationType,
  CreateConversationParams,
  User,
} from '../../utils/types';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { searchUsers } from '../../utils/api';

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  type: ConversationType;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal, type }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>({});

  const [query, setQuery] = useState('');
  const [userResults, setUserResults] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const [searching, setSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          console.log(data);
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const onSubmit = (data: CreateConversationParams) => {
    console.log(data);
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        console.log('done');
        setShowModal(false);
        navigate(`/conversations/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField onChange={(e) => setQuery(e.target.value)} />
        </InputContainer>
      </section>
      <RecipientResultContainer>asdd</RecipientResultContainer>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField />
        </InputContainer>
      </section>
      <Button>Create Conversation</Button>
    </form>
  );
};
