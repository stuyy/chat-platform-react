import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGroupGuard } from '../utils/hooks/useGroupGuard';

export const GroupPageGuard: FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { loading, error } = useGroupGuard();
  if (loading) return <div>loading group</div>;
  return error ? (
    <Navigate to="/groups" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};
