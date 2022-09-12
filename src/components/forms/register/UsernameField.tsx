import { AxiosError } from 'axios';
import { FC } from 'react';
import { checkUsernameExists } from '../../../utils/api';
import {
  InputContainer,
  InputContainerHeader,
  InputError,
  InputField,
  InputLabel,
} from '../../../utils/styles';
import { RegisterFormFieldProps } from '../../../utils/types/form';

export const UsernameField: FC<RegisterFormFieldProps> = ({
  register,
  errors,
}) => {
  console.log('Username Errors: ', errors.username);
  return (
    <InputContainer>
      <InputContainerHeader>
        <InputLabel htmlFor="username">Username</InputLabel>
        {errors.username && <InputError>{errors.username.message}</InputError>}
      </InputContainerHeader>
      <InputField
        type="text"
        id="username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Must be 3 characters long',
          },
          maxLength: {
            value: 16,
            message: 'Exceeds 16 characters',
          },
          validate: {
            checkUsername: async (username: string) => {
              try {
                await checkUsernameExists(username);
              } catch (err) {
                return (
                  (err as AxiosError).response?.status === 409 &&
                  'Username already exists'
                );
              }
            },
          },
        })}
      />
    </InputContainer>
  );
};
