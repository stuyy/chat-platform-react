import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { postRegisterUser } from '../../../utils/api';
import { Button } from '../../../utils/styles';
import { CreateUserParams } from '../../../utils/types';
import { toast } from 'react-toastify';
import styles from '../index.module.scss';
import { UsernameField } from './UsernameField';
import { NameField } from './NameField';
import { PasswordField } from './PasswordField';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserParams>({ reValidateMode: 'onBlur' });

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

  const formFieldProps = { errors, register };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <UsernameField {...formFieldProps} />
      <NameField {...formFieldProps} />
      <PasswordField {...formFieldProps} />
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
