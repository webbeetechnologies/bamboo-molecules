import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { IconButton } from '../../../src/components';
import { delay } from '../../common';
import { Example } from './Select';
import { useArgs } from '@storybook/addons';
import { useCallback } from 'react';

export default {
    title: 'components/Select',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => {
    const [_, updatedArgs] = useArgs();
    const onChange = useCallback(
        (value: any) =>
            updatedArgs({
                ...args,
                value: value,
            }),
        [args, updatedArgs],
    );

    return <Example {...args} onChange={onChange} />;
};

Default.args = {
    records: [
        {
            data: [
                {
                    id: 11,
                    name: 'Preview',
                    left: <IconButton name="eye-outline" onPress={() => {}} />,
                },
                {
                    id: 12,
                    name: 'Share',
                    left: <IconButton name="account-plus-outline" onPress={() => {}} />,
                },
                {
                    id: 13,
                    name: 'Get link',
                    left: <IconButton name="link" onPress={() => {}} />,
                },
                {
                    id: 14,
                    name: 'Remove',
                    left: <IconButton name="trash-can-outline" onPress={() => {}} />,
                },
                {
                    id: 15,
                    name: 'Download',
                    left: <IconButton name="tray-arrow-down" onPress={() => {}} />,
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
