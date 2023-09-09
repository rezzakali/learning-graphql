import { useMutation } from '@apollo/client';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER } from '../gqlOperations/queries';

const Register = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      variables: {
        newUser: user,
      },
    });
  };

  useEffect(() => {
    if (data && data.register?.success) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center h-screen my-5">
      <Card color="transparent" className="w-96 p-5">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="md"
              label="Name"
              required
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <Input
              size="md"
              label="Email"
              required
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <Input
              size="md"
              label="Username"
              required
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="number"
              size="md"
              label="Phone"
              required
              name="phone"
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
          {data && (
            <Typography className="text-green-400">
              Register successfully!
            </Typography>
          )}
          <Button className="mt-6" fullWidth type="submit">
            {loading ? 'Loading...' : 'Register'}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Register;
