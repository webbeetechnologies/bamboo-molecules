import { ComponentType, FC, memo } from 'react';
import type { DataTableCellProps, DataTableHeaderCellProps } from '../types';
import { useMolecules } from '../../../../stories/common';
import { generateFlatListData } from '__mocks__/generateFlatListData';
import type { FlatListProps } from 'react-native';

export const CellRenderer: FC<DataTableCellProps> = memo(({ row, column }) => {
    const { Text } = useMolecules();
    return (
        <Text>
            {column.title} {row.title}
        </Text>
    );
});

export const HeaderRenderer: FC<DataTableHeaderCellProps> = memo(({ column }) => {
    const { H4 } = useMolecules();
    return <H4>{column.title}</H4>;
});

export const getDataTableMockProps = (
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
