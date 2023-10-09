import { withDocsWrapper, useMolecules } from '../common';
import { Source } from '@storybook/addon-docs';

const DocsPage = () => {
    const { View, H1, H3, Code, Text } = useMolecules();

    return (
        <View>
            <H1>Shortcuts Manager</H1>
            <Text>
                Shortcuts Manager uses Event Delegation and Observer Pattern to distribute events.
            </Text>
            <Text>
                It accepts an array of Shortcuts in which one could define key combinations that
                will trigger the Shortcut Event.
            </Text>
            <Text>
                Shortcut events can be listened to by using <Code>useShortcut</Code> hook. It
                accepts the name of the shortcut that you want to listen to and callback. The
                callback function is triggered when a key combination defined in the shortcut is
                triggered.
            </Text>

            <H3>Scopes</H3>
            <Text>
                Scopes is an optional prop in ShortcutManager. It's useful for group shortcuts and
                enabling and disable all of them at once.
            </Text>
            <Text>
                It also can be used for FocusTrapping the Shortcuts to a component. With FocusTrap,
                the Shortcut with certain scope will only be triggerred if the element defined in
                the scope or the children inside it is focused
            </Text>

            <Text>Basic example: </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { useMolecules, isMac } from '@bambooapp/bamboo-molecules';
import {
    useShortcut,
    ShortcutsManager,
    Shortcut,
} from '@bambooapp/bamboo-molecules/shortcuts-manager';

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

export const Wrapper = () => {
    return (
        <ShortcutsManager shortcuts={_shortcuts}>
            <MyComponent id={id} />
        </ShortcutsManager>
    );
};

export const MyComponent = () => {
    const { View, Text } = useMolecules();

    useShortcut('copy', ({ shortcut }) => {
        // eslint-disable-next-line no-console
        console.log({ shortcut });
    });

    useShortcut('paste', async ({ shortcut }) => {
        // eslint-disable-next-line no-console
        console.log({ shortcut });
    });

    return (
        <View style={styles.container}>
            <Text>Press Control/Meta + c to copy</Text>
            <Text>Press Control/Meta + v to paste</Text>
        </View>
    );
};
`;

export default withDocsWrapper(DocsPage);
