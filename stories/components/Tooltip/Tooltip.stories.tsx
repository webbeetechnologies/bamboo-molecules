import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Tooltip';
import { userEvent, waitFor, within } from '@storybook/test';
import { expect } from '@storybook/test';
import { delay } from '../../common';

export default {
    title: 'components/Tooltip',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
 <Tooltip>
    <Tooltip.Trigger>
        <IconButton name="star-outline" />
    </Tooltip.Trigger>
    <Tooltip.Content>
        mark as favorite
    </Tooltip.Content>
</Tooltip>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
        await expect(canvas.queryByText('mark as favorite')).not.toBeTruthy();

        await userEvent.hover(canvas.getByRole('button'));

        await delay(150);

        await expect(canvas.getByText('mark as favorite')).toBeInTheDocument();

        await userEvent.unhover(canvas.getByRole('button'));

        await delay(150);

        await expect(canvas.queryByText('mark as favorite')).not.toBeTruthy();
    });
};
