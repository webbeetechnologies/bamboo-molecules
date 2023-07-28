import { ComponentType, forwardRef, memo } from 'react';
import type { RenderCellProps } from '../../../components';
import { RowType } from '../../utils';
import DataCell from './DataCellRenderer';
import HeaderCell from './GroupHeaderRenderer';
import FooterCell from './GroupFooterRenderer';
import { useRecordType } from '../../contexts/TableManagerContext';

export type Props = Omit<RenderCellProps, 'ref'>;

const cellTypes: Record<RowType, ComponentType<Props>> = {
    [RowType.DATA]: DataCell,
    [RowType.HEADER]: HeaderCell,
    [RowType.FOOTER]: FooterCell,
};

const CellRenderer = (props: Props, ref: any) => {
    const CellComponent = cellTypes[useRecordType(props.row)];
    return <CellComponent {...props} ref={ref} />;
};

export default memo(forwardRef(CellRenderer));
