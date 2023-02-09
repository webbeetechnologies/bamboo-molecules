import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './FilePicker';

export default {
    title: 'components/FilePicker',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    type: ['image/*'],
    label: 'Choose image',
    multiple: false,
    /**
     * currently, only supported on IOS and Android
     */
    // eslint-disable-next-line no-console
    onCancel: () => console.log('cancelled!'),
};

Default.parameters = {
    docs: {
        source: {
            code: `
<FilePicker type={['image/*']} label="Choose image" multiple={false} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Outlined: ComponentStory<typeof Example> = args => <Example {...args} />;

Outlined.args = {
    type: ['image/*'],
    label: 'Choose image',
    multiple: false,
    variant: 'outlined',
};

Outlined.parameters = {
    docs: {
        source: {
            code: `
<FilePicker type={['image/*']} label="Choose image" multiple={false} variant="outlined" {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
