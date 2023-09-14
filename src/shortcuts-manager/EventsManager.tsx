import { memo, useCallback, useEffect } from 'react';

import { useShortcutsManagerStoreRef } from './ShortcutsManager';
import { calculateShortcutEventName, getPressedModifierKeys, normalizeKeys } from './utils';
import type { ShortcutEventDetail } from './types';

const EventsManager = () => {
    const { store, set: setShortcutsManagerStore } = useShortcutsManagerStoreRef();

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const modifierKeys = getPressedModifierKeys(e);
            const normalizedKeys = normalizeKeys([e.key].concat(modifierKeys));

            setShortcutsManagerStore(prev => ({
                pressedKeys: [...prev.pressedKeys, e.key],
            }));

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
        [setShortcutsManagerStore, store],
    );

    const onKeyUp = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            setShortcutsManagerStore(prev => ({
                pressedKeys: prev.pressedKeys?.filter(key => key !== e.key),
            }));
        },
        [setShortcutsManagerStore],
    );

    const onBlur = useCallback(() => {
        setShortcutsManagerStore(() => ({
            pressedKeys: [],
        }));
    }, [setShortcutsManagerStore]);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('blur', onBlur);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('blur', onBlur);
        };
    }, [onBlur, onKeyDown, onKeyUp]);
    return null;
};

export default memo(EventsManager);
