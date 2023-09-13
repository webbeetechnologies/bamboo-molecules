import { memo, useCallback, useEffect } from 'react';

import { shortcutEventPrefix, useShortcutsManagerStoreRef } from './ShortcutsManager';
import { getPressedModifierKeys, normalizeKeys } from './utils';
import type { ShortcutEventDetail } from './types';

const EventsManager = () => {
    const { store } = useShortcutsManagerStoreRef();

    const callback = useCallback(
        (e: KeyboardEvent) => {
            const modifierKeys = getPressedModifierKeys(e);
            const normalizedKeys = normalizeKeys([e.key].concat(modifierKeys));

            Object.values(store.current.shortcuts).forEach(shortcut => {
                if (shortcut.scope && !store.current.scopes[shortcut.scope]) return;

                const foundMatchedKeys = shortcut.keys.find(
                    keyGroup => normalizeKeys(keyGroup) === normalizedKeys,
                );

                console.log({ foundMatchedKeys, normalizedKeys });

                if (!foundMatchedKeys) return;

                const event = new CustomEvent<ShortcutEventDetail>(
                    `${shortcutEventPrefix}${shortcut.name}`,
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
