import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Portal';
import { ProvideMolecules } from '../../common';

export default {
    title: 'components/Portal',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
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
});`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
