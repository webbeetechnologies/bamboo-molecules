import type { DataTableRowProps, UseRowRenderer } from '../../components/DataTable/types';
import type { RowType } from '../utils';
import { useRowRenderer } from './HooksContext';
import { useRecordType } from './TableManagerContext';

type CreateUseRowRenderer = (
    renderers: Partial<Record<RowType, React.ComponentType<DataTableRowProps>>>,
) => UseRowRenderer;

export const createUseRowRenderer: CreateUseRowRenderer = renderers => (props, DefaultRenderer) => {
    const rowType = useRecordType(props.rowId);
    const RowRenderer = useRowRenderer(props, DefaultRenderer);

    return RowRenderer ?? renderers[rowType];
};
