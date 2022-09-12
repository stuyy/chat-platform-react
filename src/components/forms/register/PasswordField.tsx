import { FC } from 'react';
import { checkUsernameExists } from '../../../utils/api';
import {
  InputContainer,
  InputLabel,
  InputField,
  InputContainerHeader,
  InputError,
} from '../../../utils/styles';
import { RegisterFormFieldProps } from '../../../utils/types/form';

export const PasswordField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputError>{errors.password?.message}</InputError>
      </InputContainerHeader>
      <InputField
        type="password"
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
    </InputContainer>
  );
};
