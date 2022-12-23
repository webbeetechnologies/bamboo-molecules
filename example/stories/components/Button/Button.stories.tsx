import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { Example } from './Button';

export default {
    title: 'components/Button',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Text: ComponentStory<typeof Example> = args => <Example {...args} />;

Text.args = {
    children: 'Text Button',
    variant: 'text',
    testID: 'button-text',
};

Text.parameters = {
    docs: {
        source: {
            code: `
<Button variant="text">Default Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Contained: ComponentStory<typeof Example> = args => <Example {...args} />;

Contained.args = {
    children: 'Contained Button',
    variant: 'contained',
};

Contained.parameters = {
    docs: {
        source: {
            code: `
<Button variant="contained">Contained Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Outlined: ComponentStory<typeof Example> = args => <Example {...args} />;

Outlined.args = {
    children: 'Outlined Button',
    variant: 'outlined',
};

Outlined.parameters = {
    docs: {
        source: {
            code: `
<Button variant="outlined">Outlined Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ContainedTonal: ComponentStory<typeof Example> = args => <Example {...args} />;

ContainedTonal.args = {
    children: 'ContainedTonal Button',
    variant: 'contained-tonal',
};

ContainedTonal.parameters = {
    docs: {
        source: {
            code: `
<Button variant="contained-tonal">ContainedTonal Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Elevated: ComponentStory<typeof Example> = args => <Example {...args} />;

Elevated.args = {
    children: 'Elevated Button',
    variant: 'elevated',
};

Elevated.parameters = {
    docs: {
        source: {
            code: `
<Button variant="elevated">Elevated Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ButtonPerformance: ComponentStory<typeof Example> = args => {
    return <Example {...args} />;
};

ButtonPerformance.args = {
    children: 'Performance Button',
    variant: 'elevated',
};

ButtonPerformance.parameters = {
    docs: {
        source: {
            code: `
<Button variant="elevated">Performance Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
    performance: {
        allowedGroups: ['client'],
    },
};

// interaction tests

const hoverInteractions = async ({
    canvasElement,
    hoverBackground,
    defaultBackground,
}: {
    canvasElement: HTMLElement;
    defaultBackground: string;
    hoverBackground: string;
}) => {
    const canvas = within(canvasElement);

    await expect(
        window.getComputedStyle(canvas.getByRole('button').parentElement as HTMLElement)
            .backgroundColor,
    ).toBe(defaultBackground);

    await delay(500);

    await userEvent.hover(canvas.getByRole('button'));

    await delay(500);

    await expect(
        window.getComputedStyle(canvas.getByRole('button').parentElement as HTMLElement)
            .backgroundColor,
    ).toBe(hoverBackground);

    await delay(500);

    await userEvent.unhover(canvas.getByRole('button'));

    await delay(500);

    await expect(
        window.getComputedStyle(canvas.getByRole('button').parentElement as HTMLElement)
            .backgroundColor,
    ).toBe(defaultBackground);
};

Contained.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        defaultBackground: 'rgb(103, 80, 164)',
        hoverBackground: 'rgb(98, 76, 156)',
    });

ContainedTonal.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        defaultBackground: 'rgb(232, 222, 248)',
        hoverBackground: 'rgb(201, 197, 209)',
    });

Elevated.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        defaultBackground: 'rgba(103, 80, 164, 0.05)',
        hoverBackground: 'rgb(241, 239, 247)',
    });

Outlined.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        defaultBackground: 'rgba(0, 0, 0, 0)',
        hoverBackground: 'rgb(241, 239, 247)',
    });

Text.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        defaultBackground: 'rgba(0, 0, 0, 0)',
        hoverBackground: 'rgb(241, 239, 247)',
    });
