import { FC, PropsWithChildren, ReactElement } from 'react';
import { GlobalStore } from './global';
import { StoreContext } from './context';

/**
 * Store provider
 */
const StoreProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const store = new GlobalStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { StoreProvider };
