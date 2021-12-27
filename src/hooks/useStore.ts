import { createContext, useContext } from 'solid-js';
import { SetStoreFunction, Store } from 'solid-js/store';
import { PageProps } from '$/pages/index.page';

export const StoreContext = createContext<[get: Store<PageProps>, set: SetStoreFunction<PageProps>]>({} as any)

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;

