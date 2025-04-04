import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

import { Icon } from '../../../src/components';
import { delay } from '../../common';
import { Example } from './Select';
import { useState } from 'react';

export default {
    title: 'components/Select',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => {
    const [value, setValue] = useState(null);

    // @ts-ignore
    return <Example {...args} value={value} onChange={setValue} />;
};

Default.args = {
    records: [
        {
            data: [
                {
                    id: 11,
                    name: 'Preview',
                    left: <Icon name="eye-outline" size={24} />,
                },
                {
                    id: 12,
                    name: 'Share',
                    left: <Icon name="account-plus-outline" size={24} />,
                },
                {
                    id: 13,
                    name: 'Get link',
                    left: <Icon name="link" size={24} />,
                },
                {
                    id: 14,
                    name: 'Remove',
                    left: <Icon name="trash-can-outline" size={24} />,
                },
                {
                    id: 15,
                    name: 'Download',
                    left: <Icon name="tray-arrow-down" size={24} />,
                },
            ],
        },
        {
            data: [
                {
                    id: 16,
                    name: 'Test',
                    left: <Icon name="eye-outline" size={24} />,
                },
            ],
        },
    ],
    actionSheetProps: {
        gestureEnabled: true,
        snapPoints: [70, 100],
    },
    value: null,
    labelKey: 'name',
};

Default.parameters = {
    docs: {
        source: {
            code: `
type Item = {
    id: string;
    name: string;
    left: ReactNode;
};

type Record = {
    data: Item[];
};

const Example = () => {
     const { Select, IconButton } = useMolecules();
    const [value, setValue] = useState<Item | Item[] | null>(null);

    const records = useMemo<Record[]>(
        () => [
            {
                data: [
                    {
                        id: '11',
                        name: 'Preview',
                        left: <IconButton name="eye-outline" onPress={() => {}} />,
                    },
                    {
                        id: '12',
                        name: 'Share',
                        left: <IconButton name="account-plus-outline" onPress={() => {}} />,
                    },
                    {
                        id: '13',
                        name: 'Get link',
                        left: <IconButton name="link" onPress={() => {}} />,
                    },
                    {
                        id: '14',
                        name: 'Remove',
                        left: <IconButton name="trash-can-outline" onPress={() => {}} />,
                    },
                    {
                        id: '15',
                        name: 'Download',
                        left: <IconButton name="tray-arrow-down" onPress={() => {}} />,
                    },
                ],
            },
        ],
        [IconButton],
    );

    const actionSheetProps = useMemo(
        () => ({
            gestureEnabled: true,
            snapPoints: [70, 100],
        }),
        [],
    );

    return (
        <Select
            records={records}
            actionSheetProps={actionSheetProps}
            labelKey="label"
            value={value}
            onChange={setValue}
        />
    );
};
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
