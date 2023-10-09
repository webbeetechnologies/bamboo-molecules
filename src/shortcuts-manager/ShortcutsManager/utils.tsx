import type { Scope, Shortcut } from '../types';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';
import type { ReactNode } from 'react';

export type ShortcutsManagerContextType = {
    shortcuts: Record<string, Shortcut>;
    scopes: Record<string, Scope>;
    pressedKeys: string[];
    disabled?: boolean;
};

const defaultValue = {
    shortcuts: [],
    scopes: [],
    pressedKeys: [],
} as unknown as ShortcutsManagerContextType;

export const {
    Provider: ShortcutsManagerContextProvider,
    useContext: useShortcutsManagerContextSelector,
    useContextValue: useShortcutsManagerContextValueSelector,
    useStoreRef: useShortcutsManagerStoreRef,
    Context: ShortcutsManagerContext,
} = createFastContext<ShortcutsManagerContextType>(defaultValue);

export type ShortcutsManagerProps = {
    children: ReactNode;
    shortcuts?: Shortcut[];
    scopes?: Scope[];
};
