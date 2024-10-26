import { createBrowserRouter } from 'react-router-dom';
import { Login, ResetPassword } from '@auth';
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
        element: <div>Patients</div>
      }
    ]
  }
]);

export { router };
