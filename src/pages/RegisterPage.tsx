import { RegisterForm } from '../components/forms/register/index';
import { Page } from '../utils/styles';

export const RegisterPage = () => {
  return (
    <Page display="flex" justifyContent="center" alignItems="center">
      <RegisterForm />
    </Page>
  );
};
