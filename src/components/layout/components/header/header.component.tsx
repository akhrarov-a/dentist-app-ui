import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from 'antd';
import { hoc } from '@utils';
import { useHeaderProps } from './header.props';
import styles from './header.module.scss';

/**
 * <Header />
 */
const Header = hoc.observer(
  useHeaderProps,
  ({
    t,
    layoutTitle,
    profileText,
    _links,
    logout,
    onProfileClick,
    onLogoClick
  }) => (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo} onClick={onLogoClick}>
          <img src="/img/logo.webp" alt="Logo" />
          {layoutTitle ? (
            <p className={styles.logo_title}>{layoutTitle}</p>
          ) : (
            <p>Dentica</p>
          )}
        </div>
        <div className={styles.profile}>
          <div className={styles.profile_content} onClick={onProfileClick}>
            {profileText}
          </div>
          <Button onClick={logout}>{t('auth.logout')}</Button>
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
  )
);

export { Header };
