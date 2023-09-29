import { Navigate } from 'react-router-dom';
import SecurityService from '../services/SecurityService';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = SecurityService.getIntance().isLogged;

  return isLoggedIn ? children : <Navigate to="/connect" replace />;
};
