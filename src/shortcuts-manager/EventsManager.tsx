import { memo, useCallback, useEffect } from 'react';

import { useShortcutsManagerStoreRef } from './ShortcutsManager';
import { getPressedModifierKeys, normalizeKeys } from './utils';

const EventsManager = () => {
    const { store } = useShortcutsManagerStoreRef();

    const callback = useCallback(
        (e: KeyboardEvent) => {
            const modifierKeys = getPressedModifierKeys(e);
            const normalizedKeys = normalizeKeys([e.key].concat(modifierKeys));

            Object.values(store.current.shortcuts).forEach(shortcut => {
                if (shortcut.scope && !store.current.scopes[shortcut.scope]) return;

                if (shortcut.keys.find(keyGroup => normalizeKeys(keyGroup) === normalizedKeys)) {
                    if (!shortcut.event) return;

                    document.dispatchEvent(shortcut.event);
                }
            });
        },
        [store],
    );

    useEffect(() => {
        document.addEventListener('keydown', callback);

        return () => {
            document.removeEventListener('keydown', callback);
        };
    }, [callback]);
    return null;
};

export default memo(EventsManager);
