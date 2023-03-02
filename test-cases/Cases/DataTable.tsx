import type { FC } from 'react';
import { DataTableProps, useMolecules, useToggle } from 'bamboo-molecules';
import { useCallback, useState } from 'react';
import { Text, FlatList as RnFlatList } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import type { LayoutChangeEvent } from 'react-native';

const generateRandomNumber = (start: number, range: number) =>
    Math.floor(Math.random() * range) + start;

type ManipulateOutputObject<T = any> = (i: number) => T;

export const generateFlatListData = (
    dataLength: number,
    manipulateOutputObj: ManipulateOutputObject = i => ({
        id: i,
        title: `item ${i}`,
    }),
): ReturnType<typeof manipulateOutputObj>[] => {
    // Create an empty array
    const arr: ReturnType<typeof manipulateOutputObj>[] = [];

    // Loop n times
    for (let i = 0; i < dataLength; i++) {
        // Create an object with the unique id, title, and data properties
        const obj = manipulateOutputObj(i);

        // Push the object into the array
        arr.push(obj);
    }

    // Return the array
    return arr;
};

const getData = (): DataTableProps => {
    const startTime = Date.now();
    return {
        columns: generateFlatListData(generateRandomNumber(20, 50), i => ({
            title: `column ${i}`,
            id: `column-${i}-${startTime}`,
        })),
        records: generateFlatListData(generateRandomNumber(50, 500), i => ({
            title: `row ${i}`,
            id: `row-${i}-${startTime}`,
        })),
        renderHeader: ({ column }) => <Text key={column.id}>{column.title}</Text>,
        renderCell: ({ column, row }) => (
            <Text key={column.id}>{`${column.title} ${row.title}`}</Text>
        ),
    };
};

export const DataTableDemo: FC = () => {
    const { ElementGroup, Button, DataTable, View } = useMolecules();
    const [props, setProps] = useState(getData);
    const { state: isRnFlatList, onToggle } = useToggle(false);
    const [dimensions, setDimensions] = useState('');

    const handleUpdateProps = useCallback(() => setProps(getData()), [setProps]);

    const FlatListComponent = isRnFlatList ? RnFlatList : FlatList;

    const handleLayout = useCallback((e: LayoutChangeEvent) => {
        setDimensions(
            JSON.stringify({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
            }),
        );
    }, []);

    return (
        <>
            <ElementGroup>
                <Button onPress={handleUpdateProps}>
                    <Text>Update Props</Text>
                </Button>
                <Button onPress={onToggle}>
                    <Text>Use {!isRnFlatList ? 'RN' : 'RNGH'} FlatList</Text>
                </Button>
            </ElementGroup>
            <View>
                <Text>
                    R: {props.records.length} C: {props.columns.length}
                </Text>
                <Text>{dimensions}</Text>
            </View>
            <DataTable
                onLayout={handleLayout}
                key={isRnFlatList.toString()}
                {...props}
                FlatListComponent={FlatListComponent}
            />
        </>
    );
};
