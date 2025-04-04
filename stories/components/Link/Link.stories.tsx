import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Link';
import { userEvent, waitFor, within } from '@storybook/test';
import { expect } from '@storybook/test';
import { delay } from '../../common';

export default {
    title: 'components/Link',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    href: 'https://google.com',
    children: 'Visit Google',
    testID: 'LinkComponent-test',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<Link href="https://google.com">Visit Google</Link>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const defaultColor = 'rgb(103, 80, 164)';
    // const hoverColor = 'rgb(103, 80, 164)';

    await waitFor(() => canvas);
    const link = await canvas.getByTestId('LinkComponent-test');

    await waitFor(() => expect(window.getComputedStyle(link).color).toBe(defaultColor));

    await delay(0);

    await userEvent.hover(link);

    await waitFor(() => expect(window.getComputedStyle(link).textDecorationLine).toBe('underline'));

    await userEvent.unhover(link);

    await delay(0);

    await expect(window.getComputedStyle(link).color).toBe(defaultColor);
};
