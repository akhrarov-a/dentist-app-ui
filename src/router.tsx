import { createBrowserRouter } from 'react-router-dom';
import { UserRole } from '@api';
import { Redirect, RoleGuard } from '@components';
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
        element: <RoleGuard roles={[UserRole.DENTIST]} />,
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
        element: <RoleGuard roles={[UserRole.DENTIST]} />,
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
        element: <RoleGuard roles={[UserRole.DENTIST]} />,
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
        element: <RoleGuard roles={[UserRole.ADMIN]} />,
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
        element: <RoleGuard roles={[UserRole.DENTIST, UserRole.ADMIN]} />,
        children: [
          {
            path: '',
            element: <Profile />
          }
        ]
      },
      {
        path: '*',
        element: <Redirect />
      }
    ]
  }
]);

export { router };
