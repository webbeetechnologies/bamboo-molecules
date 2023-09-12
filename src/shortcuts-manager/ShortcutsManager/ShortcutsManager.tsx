import { memo, useMemo, useRef } from 'react';

import { keyBy } from '../../utils';
import EventsManager from '../EventsManager';
import type { Shortcut, ShortcutWithEvent } from '../types';
import {
    ShortcutsManagerProps,
    shortcutEventPrefix,
    ShortcutsManagerContextProvider,
} from './utils';

const _ShortcutsManager = ({ shortcuts, scopes, children }: ShortcutsManagerProps) => {
    const shortcutsRef = useRef<Shortcut[]>(shortcuts);
    const scopesRef = useRef(scopes);

    const contextValue = useMemo(() => {
        const _shortcuts = shortcutsRef.current.reduce(
            (acc: Record<string, ShortcutWithEvent>, shortcut) => {
                acc[shortcut.name] = {
                    ...shortcut,
                    event: new CustomEvent(`${shortcutEventPrefix}${shortcut.name}`),
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
