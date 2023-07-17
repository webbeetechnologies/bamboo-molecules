import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example } from './DataTable';
import { View, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getDataTableMockProps } from '../../../src/components/DataTable/__mocks__/getDataTableProps';
import DocsPage from './DataTable.docs';
import DataTableScroll from './DataTableScroll';

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

// Added fixed width and height for consistent performance benchmarking
const style = { height: 500, width: 1000 };
export const Default: ComponentStory<typeof Example> = args => (
    <View style={style}>
        <Example {...args} />
    </View>
);
Default.args = getDataTableMockProps(1000, 10);
Default.parameters = {
    docs: {
        page: DocsPage,
    },
};

export const MoreColumnsLessRowsDefault: ComponentStory<typeof Example> = Default.bind({});
MoreColumnsLessRowsDefault.args = getDataTableMockProps(10, 200);
MoreColumnsLessRowsDefault.parameters = {
    docs: {
        page: DocsPage,
    },
};

export const DataTableScrollTest: ComponentStory<typeof Example> = DataTableScroll;
DataTableScrollTest.args = getDataTableMockProps(2000, 50);
DataTableScrollTest.parameters = {};
