import { FC, memo } from 'react';
import {
    DataTable,
    DataTableProps,
    DataTableHeaderCellProps,
    DataTableCellProps,
} from '../../../src/components';
import { useMolecules } from '../../common';

export const Example = memo((props: DataTableProps) => {
    return <DataTable {...props} />;
});

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
