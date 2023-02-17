import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { CellRenderer, Example, HeaderRenderer } from './DataTable';
import { generateFlatListData } from '../../common';
import { FlatList, View, FlatListProps, ViewStyle } from 'react-native';
import {
    FlatList as RNGestureFlatList,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import type { DataTableCellProps, DataTableHeaderCellProps } from '../../../src/components';
import type { ComponentType } from 'react';

// Root story aligns everything to center, it breaks the table component.
const gestureRootViewStyles = { flex: 0, alignSelf: 'flex-start' } as ViewStyle;
export default {
    title: 'components/DataTable',
    component: Example,
    decorators: [
        Story => (
            <GestureHandlerRootView style={gestureRootViewStyles}>
                <Story />
            </GestureHandlerRootView>
        ),
    ],
} as ComponentMeta<typeof Example>;

const getArgs = (
    rows: number,
    columns: number,
    FlatListComponent?: ComponentType<FlatListProps<any>>,
) => ({
    columns: generateFlatListData(columns, index => ({
        id: `column-${index}`,
        title: `Column ${index}`,
    })),
    records: generateFlatListData(rows, index => ({
        id: `row-${index}`,
        title: `Row ${index}`,
    })),
    FlatListComponent,
    renderCell: (props: DataTableCellProps) => <CellRenderer {...props} />,
    renderHeader: (props: DataTableHeaderCellProps) => <HeaderRenderer {...props} />,
});

// Added fixed width and height for consistent performance benchmarking
const style = { height: 500, width: 1000 };
export const Default: ComponentStory<typeof Example> = args => (
    <View style={style}>
        <Example {...args} />
    </View>
);
Default.args = getArgs(1000, 10, RNGestureFlatList);

export const DefaultFlatList: ComponentStory<typeof Example> = Default.bind({});
DefaultFlatList.args = getArgs(1000, 10, FlatList);

export const MoreColumnsLessRowsDefault: ComponentStory<typeof Example> = Default.bind({});
MoreColumnsLessRowsDefault.args = getArgs(10, 200, RNGestureFlatList);

export const MoreColumnsLessRowsFlatList: ComponentStory<typeof Example> = Default.bind({});
MoreColumnsLessRowsFlatList.args = getArgs(10, 200, FlatList);
