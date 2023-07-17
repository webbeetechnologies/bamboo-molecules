import { createContext, useContext } from 'react';
import { useMolecules } from '../../common';
import type { FlatListProps } from 'react-native';
import type { getDataTableMockProps } from 'src/components/DataTable/__mocks__/getDataTableProps';

type Props = ReturnType<typeof getDataTableMockProps>;

const Columns = createContext({} as Omit<Props, 'records'>);
const CellContext = createContext(
    {} as {
        row: string;
        rowIndex: number;
    },
);

const renderItem: FlatListProps<string>['renderItem'] = ({ item, index }) => {
    return <Item item={item} index={index} />;
};

const renderRowCell = (item: string, index: number) => {
    return <Cell item={item} index={index} />;
};

const cellStyle = { width: 150 };
const Cell = ({ item, index }: { item: string; index: number }) => {
    const { renderCell } = useContext(Columns);
    const { row, rowIndex } = useContext(CellContext);
    const { View } = useMolecules();

    return (
        <View style={cellStyle}>
            {renderCell({ column: item, columnIndex: index, row, rowIndex })}
        </View>
    );
};

const row = { flexDirection: 'row' as const };
const Item = ({ item, index }: { item: string; index: number }) => {
    const { columns } = useContext(Columns);
    const { View } = useMolecules();

    return (
        <CellContext.Provider value={{ row: item, rowIndex: index }}>
            <View style={row}>{columns.map(renderRowCell)}</View>
        </CellContext.Provider>
    );
};

const style = { height: '50vh', width: 500 };
export default ({ records, ...props }: Props) => {
    const { FlatList, ScrollView } = useMolecules();

    return (
        <ScrollView horizontal style={style}>
            <Columns.Provider value={props}>
                <FlatList data={records} renderItem={renderItem} />
            </Columns.Provider>
        </ScrollView>
    );
};
