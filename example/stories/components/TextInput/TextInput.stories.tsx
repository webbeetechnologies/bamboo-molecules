import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { Example, IconComponent } from './TextInput';
import type { TextInputProps } from 'bamboo-molecules';

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
    testID: 'default-text-input',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<TextInput placeholder="Placeholder" />
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
    testID: 'outlined-text-input',
};

Outlined.parameters = {
    docs: {
        source: {
            code: `
<TextInput variant="outlined" placeholder="Placeholder" label="Label" />
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
    testID: 'flat-text-input',
};

Flat.parameters = {
    docs: {
        source: {
            code: `
<TextInput variant="flat" placeholder="Placeholder" label="Label" />
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
            testID="left-element-icon"
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
   />
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
            testID="right-element-icon"
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
    />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

const typeInteractionTest = async ({
    canvasElement,
    testID,
    variant,
}: {
    canvasElement: HTMLElement;
    testID: string;
    variant: TextInputProps['variant'];
}) => {
    const canvas = within(canvasElement);

    await delay(500);

    // type something
    await userEvent.type(canvas.getByTestId(`${testID}-${variant}`), 'hello');

    await delay(500);

    // in focus mode, the label should be highlighted with the primary color
    await expect(window.getComputedStyle(canvas.getByTestId(`${testID}-label-active`)).color).toBe(
        'rgb(103, 80, 164)',
    );

    await delay(500);

    await userEvent.clear(canvas.getByTestId(`${testID}-${variant}`));

    await userEvent.click(canvasElement);

    await delay(500);

    await expect(window.getComputedStyle(canvas.getByTestId(`${testID}-label-active`)).color).toBe(
        'rgb(73, 69, 79)',
    );
};

const elementClickInteraction = async ({
    canvasElement,
    iconTestID,
}: {
    canvasElement: HTMLElement;
    iconTestID: string;
}) => {
    const canvas = within(canvasElement);

    await delay(500);

    // type click the left element // should focus the TextInput
    await userEvent.click(canvas.getByTestId(iconTestID));

    await delay(500);

    // in focus mode, the label should be highlighted with the primary color
    await expect(window.getComputedStyle(canvas.getByTestId('text-input-label-active')).color).toBe(
        'rgb(103, 80, 164)',
    );

    await delay(500);

    await userEvent.click(canvasElement);

    await delay(500);

    await expect(window.getComputedStyle(canvas.getByTestId('text-input-label-active')).color).toBe(
        'rgb(73, 69, 79)',
    );
};

Default.play = async ({ canvasElement }) =>
    typeInteractionTest({ canvasElement, testID: 'default-text-input', variant: 'flat' });

Flat.play = async ({ canvasElement }) =>
    typeInteractionTest({ canvasElement, testID: 'flat-text-input', variant: 'flat' });

Outlined.play = async ({ canvasElement }) =>
    typeInteractionTest({ canvasElement, testID: 'outlined-text-input', variant: 'outlined' });

WithLeftElement.play = async ({ canvasElement }) =>
    elementClickInteraction({ canvasElement, iconTestID: 'left-element-icon' });

WithRightElement.play = async ({ canvasElement }) =>
    elementClickInteraction({ canvasElement, iconTestID: 'right-element-icon' });
