import { memo } from 'react';
import { DataTable, DataTableProps } from '../../../src';

export const Example = memo((props: DataTableProps) => {
    return <DataTable {...props} />;
});
