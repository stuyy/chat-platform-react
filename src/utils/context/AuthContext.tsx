import { createContext } from 'react';
import { User } from '../types';

type AuthContextType = {
  user?: User;
  updateAuthUser: (data: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});
