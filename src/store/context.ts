import { createContext, useContext } from 'react';
import { GlobalStore } from './global';

/**
 * Store context
 */
const StoreContext = createContext<GlobalStore>({} as GlobalStore);

/**
 * Use store
 */
const useStore = () => useContext(StoreContext);

export { useStore, StoreContext };
