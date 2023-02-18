import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './TouchableRipple';

export default {
    title: 'components/TouchableRipple',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
export const Example = () => {
    const { Text } = useMolecules();
    const onPress = useCallback(() => {}, []);

    return (
        <TouchableRipple style={styles.container} onPress={onPress}>
            <Text>Touchable Ripple</Text>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
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
