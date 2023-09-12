import type { Scope, Shortcut, ShortcutWithEvent } from '../types';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';
import type { ReactNode } from 'react';

export type ShortcutsManagerContextType = {
    shortcuts: Record<string, ShortcutWithEvent>;
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

export const shortcutEventPrefix = 'shortcut-event-';
