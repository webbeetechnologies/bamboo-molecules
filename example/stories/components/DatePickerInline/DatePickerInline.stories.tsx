import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';

import { Example } from './DatePickerInline';

export default {
    title: 'components/DatePickerInline',
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

Default.args = {
    mode: 'single',
    locale: 'en',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<DatePickerInline mode="single" {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
