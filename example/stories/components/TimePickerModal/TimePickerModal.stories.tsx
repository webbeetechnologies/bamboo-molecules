import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';

import { Example } from './TimePickerModal';

export default {
    title: 'components/TimePickerModal',
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
    hours: 10,
    minutes: 15,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<TimePickerModal locale="en" hours={10} minutes={15} {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
