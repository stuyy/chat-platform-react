import { FC, useState } from 'react';
import {
  InputContainer,
  InputLabel,
  InputField,
  InputContainerHeader,
  InputError,
} from '../../../utils/styles';
import { RegisterFormFieldProps } from '../../../utils/types/form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../index.module.scss';

export const PasswordField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>
        {errors.password && <InputError>{errors.password.message}</InputError>}
      </InputContainerHeader>
      <div className={styles.passwordContainer}>
        <InputField
          type={showPassword ? 'text' : 'password'}
          id="password"
          {...register('password', {
            required: 'Password is Required',
            minLength: {
              value: 8,
              message: 'Must be at least 8 characters',
            },
            maxLength: {
              value: 32,
              message: 'Max characters is 32',
            },
          })}
        />
        {showPassword ? (
          <AiFillEyeInvisible
            size={24}
            onClick={() => setShowPassword(false)}
            cursor="pointer"
          />
        ) : (
          <AiFillEye
            size={24}
            onClick={() => setShowPassword(true)}
            cursor="pointer"
          />
        )}
      </div>
    </InputContainer>
  );
};
