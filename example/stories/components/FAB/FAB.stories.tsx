import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './FAB';

export default {
    title: 'components/FAB',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    iconName: 'plus',
    onPress: () => {},
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { FAB } = useMolecules();

    const onPress = useCallback(() => {}, []);

    return <FAB iconName="plus" onPress={onPress} />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ExtendedFAB: ComponentStory<typeof Example> = args => <Example {...args} />;

ExtendedFAB.args = {
    iconName: 'pencil-outline',
    onPress: () => {},
    label: 'Compose',
};

ExtendedFAB.parameters = {
    docs: {
        source: {
            code: `
    const { FAB } = useMolecules();

    const onPress = useCallback(() => {}, []);

    return <FAB iconName="pencil-outline" label="Compose" onPress={onPress} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
