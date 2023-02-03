import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './FAB';
import { userEvent, within } from '@storybook/testing-library';
import { delay } from '../../common';
import { expect } from '@storybook/jest';

export default {
    title: 'components/FAB',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    iconName: 'plus',
    onPress: () => {},
    disabled: false,
    elevation: 3,
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { FAB } = useMolecules();

    const onPress = useCallback(() => {}, []);

    return <FAB iconName="plus" onPress={onPress} />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ExtendedFAB: ComponentStory<typeof Example> = args => <Example {...args} />;

ExtendedFAB.args = {
    iconName: 'pencil-outline',
    onPress: () => {},
    label: 'Compose',
};

ExtendedFAB.parameters = {
    docs: {
        source: {
            code: `
    const { FAB } = useMolecules();

    const onPress = useCallback(() => {}, []);

    return <FAB iconName="pencil-outline" label="Compose" onPress={onPress} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

// interaction tests
const hoverInteractions = async ({
    canvasElement,
    testID,
    defaultBackground,
    stateLayerDefaultBackground,
    stateLayerHoverBackground,
}: {
    canvasElement: HTMLElement;
    testID: string;
    defaultBackground: string;
    stateLayerDefaultBackground: string;
    stateLayerHoverBackground: string;
}) => {
    const canvas = await within(canvasElement);

    const fabPrimaryContainer = await canvas.getByTestId(`${testID}-container`);
    const fabPrimaryStateLayer = await canvas.getByTestId(`${testID}-stateLayer`);

    await expect(window.getComputedStyle(fabPrimaryContainer).backgroundColor).toBe(
        defaultBackground,
    );
    await expect(window.getComputedStyle(fabPrimaryStateLayer).backgroundColor).toBe(
        stateLayerDefaultBackground,
    );

    await delay(100);

    await userEvent.hover(fabPrimaryContainer);

    await delay(100);

    await expect(window.getComputedStyle(fabPrimaryStateLayer).backgroundColor).toBe(
        stateLayerHoverBackground,
    );

    await userEvent.unhover(fabPrimaryContainer);

    await delay(100);

    await expect(window.getComputedStyle(fabPrimaryStateLayer).backgroundColor).toBe(
        stateLayerDefaultBackground,
    );
};

export const PrimaryFABTest = Default.bind({});

PrimaryFABTest.args = {
    ...Default.args,
    variant: 'primary',
    testID: 'fabprimary',
};

PrimaryFABTest.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

PrimaryFABTest.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        testID: 'fabprimary',
        defaultBackground: 'rgb(234, 221, 255)',
        stateLayerDefaultBackground: 'rgba(0, 0, 0, 0)',
        stateLayerHoverBackground: 'rgba(33, 0, 93, 0.08)',
    });

export const SecondaryFABTest = Default.bind({});

SecondaryFABTest.args = {
    ...Default.args,
    variant: 'secondary',
    testID: 'fabsecondary',
};

SecondaryFABTest.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

SecondaryFABTest.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        testID: 'fabsecondary',
        defaultBackground: 'rgb(232, 222, 248)',
        stateLayerDefaultBackground: 'rgba(0, 0, 0, 0)',
        stateLayerHoverBackground: 'rgba(29, 25, 43, 0.08)',
    });

export const TertiaryFABTest = Default.bind({});

TertiaryFABTest.args = {
    ...Default.args,
    variant: 'tertiary',
    testID: 'fabtertiary',
};

TertiaryFABTest.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

TertiaryFABTest.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        testID: 'fabtertiary',
        defaultBackground: 'rgb(255, 216, 228)',
        stateLayerDefaultBackground: 'rgba(0, 0, 0, 0)',
        stateLayerHoverBackground: 'rgba(49, 17, 29, 0.08)',
    });

export const SurfaceFABTest = Default.bind({});

SurfaceFABTest.args = {
    ...Default.args,
    variant: 'surface',
    testID: 'fabsurface',
};

SurfaceFABTest.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

SurfaceFABTest.play = ({ canvasElement }) =>
    hoverInteractions({
        canvasElement,
        testID: 'fabsurface',
        defaultBackground: 'rgb(255, 251, 254)',
        stateLayerDefaultBackground: 'rgba(0, 0, 0, 0)',
        stateLayerHoverBackground: 'rgba(103, 80, 164, 0.08)',
    });
