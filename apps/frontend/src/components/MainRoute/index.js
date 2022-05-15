import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Loader from './loader';
import MainBody from '../MainBody/index';
import PublicRoute from '../Authentication/PublicRoute';
import PrivateRoute from '../Authentication/PrivateRoute';

const Login = lazy(() => import('../Login/Login'));
const Register = lazy(() => import('../Register/Register'));

function Index() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loader />}>
            <PublicRoute>
              <Login />
            </PublicRoute>
          </React.Suspense>
        }
      />

      <Route
        path="/register"
        element={
          <React.Suspense fallback={<Loader />}>
            <PublicRoute>
              <Register />
            </PublicRoute>
          </React.Suspense>
        }
      />

      <Route
        path="/MainBody"
        element={
          <PrivateRoute>
            <MainBody />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default Index;
