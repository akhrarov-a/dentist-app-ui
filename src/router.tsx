import { createBrowserRouter } from 'react-router-dom';
import { Redirect } from '@components';
import { Profile } from '@profile';
import { Login, ResetPassword } from '@auth';
import { CreatePatient, PatientsList, UpdatePatient } from '@patients';
import { CreateService, ServicesList, UpdateService } from '@services';
import { CreateAppointment, Schedule, UpdateAppointment } from '@schedule';
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
        path: '/services',
        children: [
          {
            path: '/services/create',
            element: <CreateService />
          },
          {
            path: '/services/:id',
            element: <UpdateService />
          },
          {
            path: '',
            element: <ServicesList />
          }
        ]
      },
      {
        path: '/schedule',
        children: [
          {
            path: '/schedule/create',
            element: <CreateAppointment />
          },
          {
            path: '/schedule/:id',
            element: <UpdateAppointment />
          },
          {
            path: '',
            element: <Schedule />
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
        path: '*',
        element: <Redirect />
      }
    ]
  }
]);

export { router };
