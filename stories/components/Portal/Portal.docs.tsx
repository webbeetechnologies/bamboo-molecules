import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>Portal</H1>
            <Text>Use a portal to render your content outside the DOM context of the parent.</Text>
            <Source language="tsx" code={portalExample} />

            <Text>
                Molecules Portal supports registering different kinds of context which would be made
                available to your children. This comes handly when you want to use context but also
                want to make use of popovers.
            </Text>
            <Source language="tsx" code={registerPortalContext} />
        </View>
    );
};

const portalExample = `
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';

export const Example = () => {
    const { View, Text, Portal } = useMolecules();

    return (
        <View style={styles.container}>
            <Text>This child is placed in the parent div.</Text>

            <Portal>
                <Text>This child is rendered outside of the root parent</Text>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 'spacings.4',
        borderWidth: 1,
        borderColor: 'colors.primary',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
});
`;

const registerPortalContext = `
import { createContext, useContext } from 'react';
import { registerPortalContext } from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';

const NumberContext = createContext(10);
const StringContext = createContext("hello world");

registerPortalContext(NumberContext);

const ChildComponent = ({ text}: { text: string }) => {
    const number = useContext(NumberContext);
    const string = useContext(StringContext);
    const { Text } = useMolecules();
    return (
        <>
            <Text>number (bridged): { number }</Text>
            <Text>string (not bridged): { string }</Text>
            <Text>{ text }</Text>
        </>
    )
}


export const Example = () => {
    const { View,  Portal } = useMolecules();

    return (
        <NumberContext value="42>
            <StringContext value="Aloha">
                <View style={styles.container}>
                    <ChildComponent text="This child is placed in the parent div." />

                    <Portal>
                        <ChildComponent text="This child is rendered outside of the root parent" />
                    </Portal>
                </View>
            </StringContext>
        </NumberContext>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 'spacings.4',
        borderWidth: 1,
        borderColor: 'colors.primary',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
});
`;

export default withDocsWrapper(DocsPage);
