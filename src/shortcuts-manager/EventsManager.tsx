import { memo, useCallback, useEffect } from 'react';

import { useShortcutsManagerStoreRef } from './ShortcutsManager';
import { calculateShortcutEventName, getPressedModifierKeys, normalizeKeys } from './utils';
import type { ShortcutEventDetail } from './types';

const EventsManager = () => {
    const { store } = useShortcutsManagerStoreRef();

    const callback = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            const modifierKeys = getPressedModifierKeys(e);
            const normalizedKeys = normalizeKeys([e.key].concat(modifierKeys));

            Object.values(store.current.shortcuts).forEach(shortcut => {
                if (shortcut.scope && !store.current.scopes[shortcut.scope]) return;

                const foundMatchedKeys = shortcut.keys.find(
                    keyGroup => normalizeKeys(keyGroup) === normalizedKeys,
                );

                if (!foundMatchedKeys) return;

                const event = new CustomEvent<ShortcutEventDetail>(
                    calculateShortcutEventName(shortcut.name),
                    {
                        detail: {
                            pressedKeys: [e.key].concat(modifierKeys),
                            normalizedKey: normalizedKeys,
                            modifiers: modifierKeys,
                            key: e.key,
                        },
                    },
                );

                document.dispatchEvent(event);
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
