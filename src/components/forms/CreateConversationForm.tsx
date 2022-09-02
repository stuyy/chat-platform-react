import { Dispatch, FC } from 'react';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from '../../utils/styles';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import {
  addConversation,
  createConversationThunk,
} from '../../store/conversationSlice';
import { useForm } from 'react-hook-form';
import { ConversationType, CreateConversationParams } from '../../utils/types';
import { AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  type: ConversationType;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal, type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'group') {
      console.log(e.target.value);
    }
  };

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField onChange={onChange} />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField
            {...register('message', { required: 'Message is required' })}
          />
        </InputContainer>
      </section>
      <Button>Create Conversation</Button>
    </form>
  );
};
