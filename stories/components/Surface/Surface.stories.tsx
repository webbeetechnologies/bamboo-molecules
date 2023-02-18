import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Surface';

export default {
    title: 'components/Surface',
    component: Example,

    argTypes: {
        elevation: { control: { type: 'number' } },
    },
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
export const Example = (props: Props) => {
    const { Text } = useMolecules();

    return (
        <Surface style={styles.surface} {...props}>
            <Text>Surface</Text>
        </Surface>
    );
};

const styles = StyleSheet.create({
    surface: {
        width: 100,
        height: 100,
        backgroundColor: 'colors.surface',
    },
});

`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
