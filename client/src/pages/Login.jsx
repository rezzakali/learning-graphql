import { useMutation } from '@apollo/client';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN } from '../gqlOperations/queries';

const Login = () => {
  const [user, setUser] = useState({});

  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        loginUser: user,
      },
    });
  };

  useEffect(() => {
    if (data && data.login) {
      localStorage.setItem('token', data.login.token);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center h-screen my-5">
      <Card className="w-96 p-5">
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="md"
              label="Email"
              required
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="password"
              size="md"
              label="Password"
              required
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {error && (
            <Typography className="text-red-400">{error?.message}</Typography>
          )}
          <Button className="mt-6" fullWidth type="submit">
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Login;
