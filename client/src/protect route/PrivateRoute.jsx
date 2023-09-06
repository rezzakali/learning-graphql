import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem('token');
  // redirect user based on accessToken
  return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
