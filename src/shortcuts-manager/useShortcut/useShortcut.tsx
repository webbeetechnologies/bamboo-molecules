import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useLatest } from '@bambooapp/bamboo-molecules';

import { useShortcutsManagerContextValueSelector } from '../ShortcutsManager';
import type { Scope, Shortcut, ShortcutEventDetail } from '../types';
import { calculateShortcutEventName } from '../utils';

const useShortcut = (
    name: string,
    callback: (shortcut: Shortcut, detail: ShortcutEventDetail) => void,
) => {
    const { shortcut, isActive, scope } = useShortcutsManagerContextValueSelector(store => {
        const _shortcut = store.shortcuts[name];

        if (!_shortcut) {
            throw new Error(`Shortcut with name: ${name} does not exist`);
        }

        return {
            shortcut: _shortcut,
            isActive: _shortcut.scope ? store.scopes[_shortcut.scope] : true,
            scope: _shortcut.scope ? store.scopes[_shortcut.scope] : undefined,
        };
    });

    const scopeRef = useLatest<Scope | undefined>(scope);
    const activeRef = useLatest(isActive);
    const shortcutRef = useLatest(shortcut);
    const callbackRef = useLatest(callback);

    const onCallback = useCallback(
        (e: CustomEvent<ShortcutEventDetail>) => {
            if (!activeRef.current) return;

            // if there is node, we check if one of the elements instead it is focused
            if (
                scopeRef.current?.node &&
                !(
                    scopeRef.current?.node === document.activeElement ||
                    scopeRef.current?.node.contains(document.activeElement)
                )
            )
                return;

            callbackRef.current(shortcutRef.current, e.detail);
        },
        [activeRef, callbackRef, scopeRef, shortcutRef],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const eventName = calculateShortcutEventName(shortcutRef.current.name);

        document.addEventListener(eventName, onCallback as (e: Event) => void);

        return () => {
            document.removeEventListener(eventName, onCallback as (e: Event) => void);
        };
    }, [onCallback, scopeRef, shortcutRef]);
};

export default useShortcut;
