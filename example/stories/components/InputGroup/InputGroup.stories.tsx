import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example as Button } from '../Button/Button';
import { Example as TextInput } from '../TextInput/TextInput';
import { Example as Icon } from '../Icon/Icon';

import { Example } from './InputGroup';

export default {
    title: 'components/InputGroup',
    component: Example,
} as ComponentMeta<typeof Example>;

export const ButtonGroup: ComponentStory<typeof Example> = args => <Example {...args} />;

ButtonGroup.args = {
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
<InputGroup>
        <Button variant="contained" onPress={() => {}}>
            Button
        </Button>
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>
</InputGroup>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const TextInputGroup: ComponentStory<typeof Example> = args => <Example {...args} />;

TextInputGroup.args = {
    children: [
        <TextInput variant="outlined" />,
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>,
    ],
};

TextInputGroup.parameters = {
    docs: {
        source: {
            code: `
<InputGroup>
        <TextInput variant="outlined" />
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>
</InputGroup>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
