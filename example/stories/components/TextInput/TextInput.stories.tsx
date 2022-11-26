import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, IconComponent } from './TextInput';

export default {
    title: 'components/TextInput',
    component: Example,

    argTypes: {},
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    label: 'Label',
    placeholder: 'Placeholder',
    multiline: false,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<TextInput placeholder="Placeholder" {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Outlined: ComponentStory<typeof Example> = args => <Example {...args} />;

Outlined.args = {
    variant: 'outlined',
    placeholder: 'Placeholder',
    label: 'Label',
    multiline: false,
};

Outlined.parameters = {
    docs: {
        source: {
            code: `
<TextInput variant="outlined" placeholder="Placeholder" label="Label" {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Flat: ComponentStory<typeof Example> = args => <Example {...args} />;

Flat.args = {
    variant: 'flat',
    placeholder: 'Placeholder',
    label: 'Label',
    multiline: false,
};

Flat.parameters = {
    docs: {
        source: {
            code: `
<TextInput variant="flat" placeholder="Placeholder" label="Label" {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithLeftElement: ComponentStory<typeof Example> = args => <Example {...args} />;

WithLeftElement.args = {
    placeholder: 'Placeholder',
    label: 'Label',
    multiline: false,
    left: ({ color, forceFocus }) => (
        <IconComponent
            name="magnify"
            type="material-community"
            size={24}
            onPress={forceFocus}
            color={color}
        />
    ),
};

WithLeftElement.parameters = {
    docs: {
        source: {
            code: `
<TextInput variant="flat" placeholder="Placeholder" label="Label" left={({ color, forceFocus }) => (
        <IconComponent
            name="magnify"
            type="material-community"
            size={24}
            onPress={forceFocus}
            color={color}
        />
    )} 
    {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithRightElement: ComponentStory<typeof Example> = args => <Example {...args} />;

WithRightElement.args = {
    placeholder: 'Placeholder',
    label: 'Label',
    multiline: false,
    right: ({ color, forceFocus }) => (
        <IconComponent
            name="magnify"
            type="material-community"
            size={24}
            onPress={forceFocus}
            color={color}
        />
    ),
};

WithRightElement.parameters = {
    docs: {
        source: {
            code: `
<TextInput variant="flat" placeholder="Placeholder" label="Label" right={({ color, forceFocus }) => (
        <IconComponent
            name="magnify"
            type="material-community"
            size={24}
            onPress={forceFocus}
            color={color}
        />
    )} 
    {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
