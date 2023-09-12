import { useShortcutsManagerStoreRef } from './shortcuts-manager';
import { useCallback } from 'react';
import type { Scope } from './types';
import { keyBy } from '../utils';

const useSetScopes = () => {
    const { set: setStore } = useShortcutsManagerStoreRef();

    return useCallback(
        (newScopes: Scope[] | ((currentScopes: Scope[]) => Scope[])) => {
            setStore(prev => ({
                scopes: keyBy(
                    typeof newScopes === 'function'
                        ? newScopes(Object.values(prev.scopes))
                        : newScopes,
                    'name',
                ),
            }));
        },
        [setStore],
    );
};

export default useSetScopes;
