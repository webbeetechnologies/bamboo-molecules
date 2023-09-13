import type { Scope, Shortcut } from '../types';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';
import type { ReactNode } from 'react';

export type ShortcutsManagerContextType = {
    shortcuts: Record<string, Shortcut>;
    scopes: Record<string, Scope>;
};

export const {
    Provider: ShortcutsManagerContextProvider,
    useContext: useShortcutsManagerContextSelector,
    useContextValue: useShortcutsManagerContextValueSelector,
    useStoreRef: useShortcutsManagerStoreRef,
} = createFastContext<ShortcutsManagerContextType>();

export type ShortcutsManagerProps = {
    children: ReactNode;
    shortcuts: Shortcut[];
    scopes?: Scope[];
};
