import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMolecules, isMac, Toast } from '../../src';
import {
    useShortcut,
    ShortcutsManager,
    Shortcut,
    useSetScopes,
    Scope,
    useShortcutsManagerContextValueSelector,
} from '../../src/shortcuts-manager';
import { Platform, StyleSheet, TextStyle } from 'react-native';
import { useLatest } from '@bambooapp/bamboo-molecules';

export const ExampleWithoutProvider = ({ id }: { id: string }) => {
    const { View, Text, Button } = useMolecules();
    const ref = useRef(null);

    const [text, setText] = useState(`This is a text from ${id}. Paste to replace this`);

    const isScopeActive = useShortcutsManagerContextValueSelector(state => !!state.scopes[id]);
    const setScopes = useSetScopes();

    useShortcut('copy', ({ shortcut }) => {
        // eslint-disable-next-line no-console
        console.log({ shortcut });

        // this will only run in web anyways
        navigator.clipboard.writeText(text);

        Toast.show({
            text1: 'copy text from' + id,
            position: 'bottom',
        });
    });

    useShortcut('paste', async ({ shortcut }) => {
        // eslint-disable-next-line no-console
        console.log({ shortcut });

        // this will only run in web anyways
        const string = await navigator.clipboard.readText();

        setText(string);
        Toast.show({
            text1: 'pasted text into' + id,
            position: 'bottom',
        });
    });

    const onPress = useCallback(() => {
        if (Platform.OS !== 'web') return;

        setScopes(currentScopes =>
            currentScopes.length
                ? []
                : ([
                      {
                          name: id,
                          // // this is currently the only way for now to get focustrap feature
                          node: document.querySelector(`[data-id=${id}]`) as HTMLElement,
                      },
                  ] as Scope[]),
        );
    }, [id, setScopes]);

    const { dataSet } = useMemo(
        () => ({
            dataSet: { id: id },
        }),
        [id],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        setScopes([
            {
                name: id,
                node: document.querySelector(`[data-id=${id}]`) as HTMLElement,
            },
        ]);
    }, [setScopes, id]);

    return (
        <>
            {/* @ts-ignore */}
            <View focusable style={styles.container} dataSet={dataSet} ref={ref}>
                <Text style={styles.title}>{id}</Text>
                <Text>Click to focus and press shortcuts!!</Text>

                <Text style={styles.text}>{text}</Text>

                <Text>Press Control/Meta + c to copy above text</Text>
                <Text>Press Control/Meta + v to paste</Text>

                <Button style={styles.button} onPress={onPress}>
                    {(isScopeActive ? 'Disable' : 'Enable') + ' shortcuts'}
                </Button>
            </View>
        </>
    );
};

const shortcuts: Shortcut[] = [
    {
        name: 'copy',
        keys: [isMac() ? ['meta', 'c'] : ['control', 'c']],
    },
    {
        name: 'paste',
        keys: [isMac() ? ['meta', 'v'] : ['control', 'v']],
    },
];

export const Example = ({ id }: { id: string }) => {
    const _shortcuts = useLatest(
        shortcuts.map(shortcut => ({
            ...shortcut,
            scope: id,
        })),
    );

    return (
        <ShortcutsManager shortcuts={_shortcuts.current}>
            <ExampleWithoutProvider id={id} />
        </ShortcutsManager>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    title: {
        typescale: 'typescale.labelLarge' as unknown as number,
    } as TextStyle,
    text: {
        typescale: 'typescale.titleMedium' as unknown as number,
        marginVertical: 'spacings.4',
    } as TextStyle,
    button: {
        marginTop: 'spacings.2',
    },
});
