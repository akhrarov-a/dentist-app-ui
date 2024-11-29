import { Outlet } from 'react-router-dom';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';
import { ConfigProvider } from 'antd';
import { useStore } from '@store';
import { Layout } from '@components';
import { hoc } from '@utils';

/**
 * App
 */
const App = hoc.observer(useStore, ({ language }) => (
  <ConfigProvider
    locale={language === 'ru' ? ruRU : enUS}
    theme={{
      token: {
        colorPrimary: '#003b5e',
        colorTextBase: '#211f27'
      }
    }}
  >
    <Layout>
      <Outlet />
    </Layout>
  </ConfigProvider>
));

export { App };
