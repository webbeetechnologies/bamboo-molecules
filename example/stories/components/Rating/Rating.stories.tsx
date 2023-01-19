import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { Example } from './Rating';

export default {
    title: 'components/Rating',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    readonly: false,
    disabled: false,
    count: 5,
    testID: 'ratingInteraction',
};

Default.parameters = {
    docs: {
        source: {
            code: ``,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const defaultColor = 'rgb(73, 69, 79)';
    const activeColor = 'rgb(250, 175, 0)';

    await waitFor(() => canvas);

    await delay(100);

    // initially everything should have default color
    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-1')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-2')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-3')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-4')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-5')).color,
    ).toBe(defaultColor);

    // after clicking to icon 3, icon 1, 2, and 3 should be active
    await userEvent.click(canvas.getByTestId('ratingInteraction-rating-item-3'));

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-1')).color,
    ).toBe(activeColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-2')).color,
    ).toBe(activeColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-3')).color,
    ).toBe(activeColor);

    // the rest should still be default color
    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-4')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-5')).color,
    ).toBe(defaultColor);

    // after clicking to icon number 2, only icon 1 and 2 should be active and 3 should be inactive
    await userEvent.click(canvas.getByTestId('ratingInteraction-rating-item-2'));

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-1')).color,
    ).toBe(activeColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-2')).color,
    ).toBe(activeColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-3')).color,
    ).toBe(defaultColor);

    // after clicking 2 again, everything should be inactive
    await userEvent.click(canvas.getByTestId('ratingInteraction-rating-item-2'));

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-1')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-2')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-3')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-4')).color,
    ).toBe(defaultColor);

    await expect(
        window.getComputedStyle(canvas.getByTestId('ratingInteraction-rating-item-5')).color,
    ).toBe(defaultColor);

    await userEvent.unhover(canvas.getByTestId('ratingInteraction-rating-item-3'));
    await userEvent.unhover(canvas.getByTestId('ratingInteraction-rating-item-2'));
};
