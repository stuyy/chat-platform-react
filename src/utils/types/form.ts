import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { CreateUserParams } from '../types';

export type RegisterFormFieldProps = {
  register: UseFormRegister<CreateUserParams>;
  errors: FieldErrorsImpl<{
    username: string;
    firstName: string;
    lastName: string;
    password: string;
  }>;
};
