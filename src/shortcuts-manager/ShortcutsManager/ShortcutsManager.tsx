import { memo, useMemo, useRef } from 'react';

import { keyBy } from '../../utils';
import EventsManager from '../EventsManager';
import type { Shortcut } from '../types';
import { ShortcutsManagerProps, ShortcutsManagerContextProvider } from './utils';

const _ShortcutsManager = ({ shortcuts, scopes, children }: ShortcutsManagerProps) => {
    const shortcutsRef = useRef<Shortcut[]>(shortcuts || []);
    const scopesRef = useRef(scopes);

    const contextValue = useMemo(() => {
        return {
            shortcuts: keyBy(shortcutsRef.current, 'name'),
            scopes: keyBy(scopesRef.current, 'name'),
            pressedKeys: [],
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
