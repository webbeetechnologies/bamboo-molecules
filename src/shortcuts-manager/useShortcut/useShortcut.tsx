import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useLatest } from '@bambooapp/bamboo-molecules';

import { useShortcutsManagerStoreRef } from '../ShortcutsManager';
import type { ShortcutEventDetail } from '../types';
import { calculateShortcutEventName } from '../utils';
import type { ShortcutCallbackArgs } from './types';

const useShortcut = (name: string, callback: (args: ShortcutCallbackArgs) => void) => {
    const { store } = useShortcutsManagerStoreRef();

    const nameRef = useLatest(name);
    const callbackRef = useLatest(callback);

    const onCallback = useCallback(
        (e: CustomEvent<ShortcutEventDetail>) => {
            const shortcut = store.current.shortcuts[nameRef.current];

            if (!shortcut) {
                throw new Error(`Shortcut with name: ${nameRef.current} does not exist`);
            }

            const scope = store.current.scopes[shortcut.scope || ''];

            if (shortcut.scope && !scope) return;

            // if there is node, we check if one of the elements instead it is focused
            if (
                scope?.node &&
                !(
                    scope.node === document.activeElement ||
                    scope.node.contains(document.activeElement)
                )
            )
                return;

            callbackRef.current({ ...e.detail, shortcut: shortcut });
        },
        [callbackRef, nameRef, store],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const eventName = calculateShortcutEventName(nameRef.current);

        document.addEventListener(eventName, onCallback as (e: Event) => void);

        return () => {
            document.removeEventListener(eventName, onCallback as (e: Event) => void);
        };
    }, [onCallback, nameRef]);
};

export default useShortcut;
