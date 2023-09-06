import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddPost from './pages/AddPost';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './protect route/PrivateRoute';
import PublicRoute from './protect route/PublicRoute';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-post"
          element={
            <PrivateRoute>
              {' '}
              <AddPost />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              {' '}
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              {' '}
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
