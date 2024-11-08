import { createBrowserRouter } from 'react-router-dom';
import { Login, ResetPassword } from '@auth';
import { Redirect } from '@components';
import { CreatePatient, PatientsList, UpdatePatient } from '@patients';
import { Profile } from '@profile';
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
            element: <CreatePatient />
          },
          {
            path: '/patients/:id',
            element: <UpdatePatient />
          },
          {
            path: '',
            element: <PatientsList />
          }
        ]
      },
      {
        path: '/schedule',
        children: [
          {
            path: '/schedule/create',
            element: <div>Create appointment</div>
          },
          {
            path: '/schedule/:id',
            element: <div>Update appointment</div>
          },
          {
            path: '',
            element: <div>Appointments</div>
          }
        ]
      },
      {
        path: '/users',
        children: [
          {
            path: '/users/create',
            element: <div>Create user</div>
          },
          {
            path: '/users/:id',
            element: <div>Update user</div>
          },
          {
            path: '',
            element: <div>Users</div>
          }
        ]
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '',
        element: <Redirect />
      }
    ]
  }
]);

export { router };
