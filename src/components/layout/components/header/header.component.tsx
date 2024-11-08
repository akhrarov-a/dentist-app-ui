import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { hoc } from '@utils';
import { useHeaderProps } from './header.props';
import styles from './header.module.scss';

/**
 * <Header />
 */
const Header = hoc.observer(useHeaderProps, ({ _links }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.logo}>
        {
          // TODO: replace logo with chatgpt
        }
        <img src="/img/logo.webp" alt="Logo" />
      </div>
      <div className={styles.profile}>
        <div className={styles.profile_content}>A</div>
        <Button>Log out</Button>
      </div>
    </div>
    <div className={styles.content_links}>
      {_links.map(link => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            classNames(styles.content_link, {
              [styles.content_link_active]: isActive
            })
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  </div>
));

export { Header };
