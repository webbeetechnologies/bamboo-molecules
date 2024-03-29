import { FC, memo } from 'react';
import type { RenderCellProps, RenderHeaderCellProps } from '../types';
import { generateFlatListData } from '../../../../__mocks__/generateFlatListData';
import { useMolecules } from '../../../hooks';

export const CellRenderer: FC<RenderCellProps> = memo(({ row, column }) => {
    const { Text } = useMolecules();
    return (
        <Text>
            {column} {row}
        </Text>
    );
});

export const HeaderRenderer: FC<RenderHeaderCellProps> = memo(({ column }) => {
    const { H4 } = useMolecules();
    return <H4>{column}</H4>;
});

export const getDataTableMockProps = (rows: number, columns: number) => ({
    rowSize: 'sm',
    columns: generateFlatListData(columns, index => `column-${index}`),
    records: generateFlatListData(rows, index => `row-${index}`),
    selectedRows: {
        'row-5': true,
        'row-13': true,
        'row-15': true,
    },
    renderCell: (props: RenderCellProps) => <CellRenderer {...props} />,
    renderHeader: (props: RenderHeaderCellProps) => <HeaderRenderer {...props} />,
});
