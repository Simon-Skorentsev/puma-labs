import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '../app/hooks';
import { LoginForm } from '../features/loginForm/LoginForm';
import { News } from '../features/news/News';
import { RegistrationForm } from '../features/registrationForm/RegistrationForm';
import { CommonRoute } from './CommonRoute';
import { PrivateRoute } from './PrivateRoute';

function AppRoutes() {
  const auth = useAuth();

  return auth.isLoaded ? (
    <Routes>
      <Route
        path="/"
        element={
          <CommonRoute>
            <LoginForm />
          </CommonRoute>
        }
      />
      <Route
        path="/news"
        element={
          <PrivateRoute>
            <News />
          </PrivateRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <CommonRoute>
            <RegistrationForm />
          </CommonRoute>
        }
      />
    </Routes>
  ) : <div>Loading...</div>;
}

export default AppRoutes;