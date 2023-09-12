import { memo, ReactNode, useMemo, useRef } from 'react';
import { Platform } from 'react-native';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import { keyBy } from '../utils';
import EventsManager from './EventsManager';
import type { Shortcut, Scope, ShortcutWithEvent } from './types';

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

export type Props = {
    children: ReactNode;
    shortcuts: Shortcut[];
    scopes?: Scope[];
};

export const shortcutEventPrefix = 'shortcut-event-';

const _ShortcutsManager = ({ shortcuts, scopes, children }: Props) => {
    const shortcutsRef = useRef<Shortcut[]>(shortcuts);
    const scopesRef = useRef(scopes);

    const contextValue = useMemo(() => {
        const _shortcuts = shortcutsRef.current.reduce(
            (acc: Record<string, ShortcutWithEvent>, shortcut) => {
                acc[shortcut.name] = {
                    ...shortcut,
                    event:
                        Platform.OS === 'web'
                            ? new CustomEvent(`${shortcutEventPrefix}${shortcut.name}`)
                            : undefined,
                };

                return acc;
            },
            {},
        );

        const scopesMap = keyBy(scopesRef.current, 'name');

        return {
            shortcuts: _shortcuts,
            scopes: scopesMap,
        };
    }, []);

    return (
        <ShortcutsManagerContextProvider value={contextValue}>
            <EventsManager />
            {children}
        </ShortcutsManagerContextProvider>
    );
};

export default memo(_ShortcutsManager);
