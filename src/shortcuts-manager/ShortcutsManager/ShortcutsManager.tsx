import { memo, useContext, useMemo, useRef } from 'react';

import { keyBy } from '../../utils';
import EventsManager from '../EventsManager';
import type { Shortcut } from '../types';
import {
    ShortcutsManagerProps,
    ShortcutsManagerContextProvider,
    ShortcutsManagerContext,
    ShortcutsManagerContextType,
} from './utils';

const _ShortcutsManager = ({ shortcuts, scopes, children }: ShortcutsManagerProps) => {
    const shortcutsRef = useRef<Shortcut[]>(shortcuts || []);
    const scopesRef = useRef(scopes);
    const parentContextRef = useContext(ShortcutsManagerContext);

    const contextValue = useMemo(() => {
        const currentValue = {
            shortcuts: keyBy(shortcutsRef.current, 'name'),
            scopes: keyBy(scopesRef.current, 'name'),
        } as ShortcutsManagerContextType;

        if (!parentContextRef) return currentValue;

        return {
            shortcuts: {
                ...parentContextRef.store.current.shortcuts,
                ...currentValue.shortcuts,
            },
            scopes: {
                ...parentContextRef.store.current.scopes,
                ...currentValue.scopes,
            },
        } as ShortcutsManagerContextType;
    }, [parentContextRef]);

    return (
        <ShortcutsManagerContextProvider value={contextValue}>
            <EventsManager />
            {children}
        </ShortcutsManagerContextProvider>
    );
};

export default memo(_ShortcutsManager);
