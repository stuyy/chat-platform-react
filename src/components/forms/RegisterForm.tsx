import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const onSubmit = (data: any) => {
    console.log(data);
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
