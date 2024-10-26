import { createBrowserRouter } from 'react-router-dom';
import { Auth } from '@auth';
import { App } from './app';

/**
 * Router
 */
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <App />,
    children: [],
  },
]);

export { router };
