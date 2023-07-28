import type { DataTableRowProps, UseRowRenderer } from '../../components/DataTable/types';
import type { RowType } from '../utils';
import { useRecordType } from './TableManagerContext';

type CreateUseRowRenderer = (
    renderers: Partial<Record<RowType, React.ComponentType<DataTableRowProps>>>,
) => UseRowRenderer;

export const createUseRowRenderer: CreateUseRowRenderer = renderers => (props, DefaultRenderer) =>
    renderers[useRecordType(props.rowId)] ?? DefaultRenderer;
