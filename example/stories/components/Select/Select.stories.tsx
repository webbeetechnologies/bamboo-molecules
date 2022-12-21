import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { Example, IconButton } from './Select';

export default {
    title: 'components/Select',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    records: [
        {
            data: [
                {
                    id: 11,
                    label: 'Preview',
                    left: <IconButton name="eye-outline" onPress={() => {}} />,
                },
                {
                    id: 12,
                    label: 'Share',
                    left: <IconButton name="account-plus-outline" onPress={() => {}} />,
                },
                {
                    id: 13,
                    label: 'Get link',
                    left: <IconButton name="link" onPress={() => {}} />,
                },
                {
                    id: 14,
                    label: 'Remove',
                    left: <IconButton name="trash-can-outline" onPress={() => {}} />,
                },
                {
                    id: 15,
                    label: 'Download',
                    left: <IconButton name="tray-arrow-down" onPress={() => {}} />,
                },
            ],
        },
    ],
    actionSheetProps: {
        gestureEnabled: true,
        snapPoints: [70, 100],
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
<Select
    records={[
        {
            data: [
                {
                    id: 11,
                    label: 'Preview',
                    left: <IconButton name="eye-outline" onPress={() => {}} />,
                },
                {
                    id: 12,
                    label: 'Share',
                    left: <IconButton name="account-plus-outline" onPress={() => {}} />,
                },
                {
                    id: 13,
                    label: 'Get link',
                    left: <IconButton name="link" onPress={() => {}} />,
                },
                {
                    id: 14,
                    label: 'Remove',
                    left: <IconButton name="trash-can-outline" onPress={() => {}} />,
                },
                {
                    id: 15,
                    label: 'Download',
                    left: <IconButton name="tray-arrow-down" onPress={() => {}} />,
                },
            ],
        },
    ]}
    actionSheetProps={{
        gestureEnabled: true,
        snapPoints: [70, 100],
    }}    
/>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const OpenSelect = Default.bind({});
OpenSelect.args = { ...Default.args, testID: 'select-trigger' };
OpenSelect.parameters = { ...Default.parameters };
OpenSelect.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByTestId('select-trigger'));

    await delay(500);

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Preview')).toBeInTheDocument();
};
