import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './VerticalDivider';

export default {
    title: 'components/VerticalDivider',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
export const Example = () => {
    const { View, Text } = useMolecules();

    return (
        <View style={styles.container}>
            <Text>Left</Text>
            <VerticalDivider bold spacing={10} />
            <Text>Right</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
