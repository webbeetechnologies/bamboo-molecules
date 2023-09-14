import { useCallback, useEffect, useRef } from 'react';

import { useMolecules, isMac, Toast } from '../../src';
import {
    useShortcut,
    ShortcutsManager,
    Shortcut,
    useSetScopes,
    Scope,
} from '../../src/shortcuts-manager';

export const ExampleWithoutProvider = () => {
    const { View, Text, Button } = useMolecules();
    const ref = useRef(null);

    const setScopes = useSetScopes();

    useShortcut('copy', ({ shortcut }) => {
        // eslint-disable-next-line no-console
        console.log({ shortcut });

        Toast.show({
            text1: 'copy shortcut',
            position: 'bottom',
        });
    });

    useShortcut('paste', ({ shortcut }) => {
        // eslint-disable-next-line no-console
        console.log({ shortcut });

        Toast.show({
            text1: 'paste shortcut',
            position: 'bottom',
        });
    });

    const onPress = useCallback(() => {
        // if (Platform.OS !== 'web') return;

        setScopes(currentScopes =>
            currentScopes.length
                ? []
                : ([
                      {
                          name: 'grid',
                          // // this is currently the only way for now to get focustrap feature
                          // node: document.querySelector('[data-id="grid"]'),
                      },
                  ] as Scope[]),
        );
    }, [setScopes]);

    useEffect(() => {
        // if (Platform.OS !== 'web') return;

        setScopes([
            {
                name: 'grid',
                // node: document.querySelector('[data-id="grid"]') as HTMLElement,
            },
        ]);
    }, [setScopes]);

    return (
        <>
            {/* @ts-ignore */}
            <View dataSet={dataSet} ref={ref}>
                <Text>Shortcut Manager Documentation Pending..</Text>
                <Button onPress={onPress}>Toggle Scopes</Button>
            </View>
        </>
    );
};

const dataSet = { id: 'grid' };

const shortcuts: Shortcut[] = [
    {
        name: 'copy',
        keys: [isMac() ? ['meta', 'c'] : ['control', 'c']],
        scope: 'grid',
    },
    {
        name: 'paste',
        keys: [isMac() ? ['meta', 'v'] : ['control', 'v']],
        scope: 'grid',
    },
];

export const Example = () => {
    return (
        <ShortcutsManager shortcuts={shortcuts}>
            <ExampleWithoutProvider />
        </ShortcutsManager>
    );
};
