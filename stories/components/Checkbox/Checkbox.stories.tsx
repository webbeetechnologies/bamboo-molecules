import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleCheckboxItem } from './Checkbox';

export default {
    title: 'components/Checkbox',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    indeterminate: false,
    disabled: false,
    defaultValue: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
import { useMolecules } from '@bambooapp/bamboo-molecules'

export const Example = () => {
    const { Checkbox }  = useMolecules();
 
    return <Checkbox indeterminate={false} defaultValue={true} />;
};`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const CheckboxItem: ComponentStory<typeof ExampleCheckboxItem> = args => (
    <ExampleCheckboxItem {...args} />
);

CheckboxItem.args = {
    indeterminate: false,
    disabled: false,
    defaultValue: true,
    label: 'Label',
};

CheckboxItem.parameters = {
    docs: {
        source: {
            code: `
import { useMolecules } from '@bambooapp/bamboo-molecules'

export const Example = () => {
    const { Checkbox }  = useMolecules();
 
    return <Checkbox.Item indeterminate={false} defaultValue={true} />;
};`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
