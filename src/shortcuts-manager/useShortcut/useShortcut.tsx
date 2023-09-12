import { useShortcutsManagerContextValueSelector, shortcutEventPrefix } from './shortcuts-manager';
import type { Scope, Shortcut } from './types';
import { useCallback, useEffect } from 'react';
import { useLatest } from '@bambooapp/bamboo-molecules';
import { Platform } from 'react-native';

const useShortcut = (name: string, callback: (shortcut: Shortcut) => void) => {
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

    const onCallback = useCallback(() => {
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

        callbackRef.current(shortcutRef.current);
    }, [activeRef, callbackRef, scopeRef, shortcutRef]);

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const eventName = `${shortcutEventPrefix}${shortcutRef.current.name}`;

        document.addEventListener(eventName, onCallback);

        return () => {
            document.removeEventListener(eventName, onCallback);
        };
    }, [onCallback, scopeRef, shortcutRef]);
};

export default useShortcut;
