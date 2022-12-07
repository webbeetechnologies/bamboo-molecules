import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example as Button } from '../Button/Button';
import { Example as TextInput } from '../TextInput/TextInput';
import { Example as Icon } from '../Icon/Icon';

import { Example } from './ElementGroup';

export default {
    title: 'components/ElementGroup',
    component: Example,
} as ComponentMeta<typeof Example>;

export const ButtonGroup: ComponentStory<typeof Example> = args => <Example {...args} />;

ButtonGroup.args = {
    orientation: 'vertical',
    children: [
        <Button variant="contained" onPress={() => {}}>
            Button
        </Button>,
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>,
    ],
};

ButtonGroup.parameters = {
    docs: {
        source: {
            code: `
<ElementGroup>
        <Button variant="contained" onPress={() => {}}>
            Button
        </Button>
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>
</ElementGroup>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const TextInputElementGroup: ComponentStory<typeof Example> = args => <Example {...args} />;

TextInputElementGroup.args = {
    children: [
        <TextInput variant="outlined" />,
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>,
    ],
};

TextInputElementGroup.parameters = {
    docs: {
        source: {
            code: `
<ElementGroup>
        <TextInput variant="outlined" />
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>
</ElementGroup>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
