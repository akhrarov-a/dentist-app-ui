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
        children: [
          {
            path: '/patients/create',
            element: <div>Create patient</div>
          },
          {
            path: '/patients/:id',
            element: <div>Update patient</div>
          },
          {
            path: '',
            element: <PatientsList />
          }
        ]
      },
      {
        path: '/appointments',
        children: [
          {
            path: '/appointments/create',
            element: <div>Create appointment</div>
          },
          {
            path: '/appointments/:id',
            element: <div>Update appointment</div>
          },
          {
            path: '',
            element: <div>Appointments</div>
          }
        ]
      },
      {
        path: '',
        element: <Navigate to="/patients" />
      }
    ]
  }
]);

export { router };
