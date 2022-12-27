import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Tooltip';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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
        <Text>mark as favorite</Text>
    </Tooltip.Content>
</Tooltip>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    await userEvent.hover(canvas.getByRole('button'));

    await delay(200);

    await expect(canvas.getByText('mark as favorite')).toBeInTheDocument();

    await delay(500);

    await userEvent.unhover(canvas.getByRole('button'));

    await delay(200);

    await expect(canvas.queryByText('mark as favorite')).not.toBeTruthy();
};
