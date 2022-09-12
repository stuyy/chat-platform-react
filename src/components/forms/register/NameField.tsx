import { FC } from 'react';
import {
  InputContainer,
  InputLabel,
  InputField,
  InputContainerHeader,
  InputError,
} from '../../../utils/styles';
import { RegisterFormFieldProps } from '../../../utils/types/form';
import styles from '../index.module.scss';

export const NameField: FC<RegisterFormFieldProps> = ({ register, errors }) => {
  return (
    <section className={styles.nameFieldRow}>
      <InputContainer>
        <InputContainerHeader>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          {errors.firstName && (
            <InputError>{errors.firstName.message}</InputError>
          )}
        </InputContainerHeader>
        <InputField
          type="text"
          id="firstName"
          {...register('firstName', {
            required: 'First Name is Required',
            minLength: 2,
            maxLength: 32,
          })}
        />
      </InputContainer>
      <InputContainer>
        <InputContainerHeader>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          {errors.lastName && (
            <InputError>{errors.lastName.message}</InputError>
          )}
        </InputContainerHeader>
        <InputField
          type="text"
          id="lastName"
          {...register('lastName', {
            required: 'Last Name is Required',
            minLength: 2,
            maxLength: 32,
          })}
        />
      </InputContainer>
    </section>
  );
};
