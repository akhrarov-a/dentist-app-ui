import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login, ResetPassword } from '@auth';
import { PatientsList } from '@patients';
import { App } from './app';

/**
 * Router
 */
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/patients',
        element: <PatientsList />
      },
      {
        path: '',
        element: <Navigate to="/patients" />
      }
    ]
  }
]);

export { router };
