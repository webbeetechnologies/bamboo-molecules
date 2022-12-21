import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { CircularExample, LinearExample } from './ProgressIndicator';

export default {
    title: 'components/ProgressIndicator',
    component: LinearExample,
} as ComponentMeta<typeof LinearExample>;

export const Linear: ComponentStory<typeof LinearExample> = args => <LinearExample {...args} />;

Linear.args = {
    progress: 0.45,
    indeterminateDuration: 2000,
    // to counteract align center by the parent
    containerStyle: {
        alignSelf: 'stretch',
    },
};

Linear.parameters = {
    docs: {
        source: {
            code: `
<ProgressIndicator.Linear progress={0.45} animating {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Circular: ComponentStory<typeof CircularExample> = args => (
    <CircularExample {...args} />
);

Circular.args = {
    progress: 0.45,
};

Circular.parameters = {
    docs: {
        source: {
            code: `
<ProgressIndicator.Linear color="colors.primary" size={30} animating {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
