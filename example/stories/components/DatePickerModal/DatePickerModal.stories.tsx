import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';

import { Example } from './DatePickerModal';

export default {
    title: 'components/DatePickerModal',
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
    locale: 'en',
    visible: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<DatePickerInput {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
