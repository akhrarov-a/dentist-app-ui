import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { StoreProvider } from '@store';
import { router } from './router';
import './styles/globals.scss';

/**
 * Create root
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#003b5e',
            colorTextBase: '#211f27',
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StoreProvider>
  </React.StrictMode>
);
