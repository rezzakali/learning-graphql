import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem('token');
  // redirect user based on accessToken
  return !accessToken ? children : <Navigate to="/" />;
};

export default PublicRoute;
