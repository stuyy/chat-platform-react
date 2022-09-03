import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postRegisterUser } from '../../utils/api';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import { CreateUserParams } from '../../utils/types';
import { toast } from 'react-toastify';
import styles from './index.module.scss';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserParams>();

  console.log(errors);
  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserParams) => {
    console.log(data);
    try {
      await postRegisterUser(data);
      navigate('/login');
      toast.clearWaitingQueue();
      toast('Account created!', { type: 'success', icon: true });
    } catch (err) {
      console.log(err);
      toast.clearWaitingQueue();
      toast('Error creating user', { type: 'error', icon: true });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
          })}
        />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First Name is Required' })}
          />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last Name is Required' })}
          />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register('password', { required: 'Password is Required' })}
        />
      </InputContainer>
      <Button className={styles.button}>Create My Account</Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};
