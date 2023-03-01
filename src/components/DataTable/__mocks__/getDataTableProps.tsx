import { ComponentType, FC, memo } from 'react';
import type { RenderCellProps, RenderHeaderCellProps } from '../types';
import { generateFlatListData } from '../../../../__mocks__/generateFlatListData';
import type { FlatListProps } from 'react-native';
import { useMolecules } from '../../../hooks';

export const CellRenderer: FC<RenderCellProps> = memo(({ row, column }) => {
    const { Text } = useMolecules();
    return (
        <Text>
            {column.title} {row.title}
        </Text>
    );
});

export const HeaderRenderer: FC<RenderHeaderCellProps> = memo(({ column }) => {
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
    selectedRows: {
        'row-5': true,
        'row-13': true,
        'row-15': true,
    },
    FlatListComponent,
    renderCell: (props: RenderCellProps) => <CellRenderer {...props} />,
    renderHeader: (props: RenderHeaderCellProps) => <HeaderRenderer {...props} />,
});
