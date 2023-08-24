import type { ComponentType } from 'react';
import type { UseRowRenderer } from '@bambooapp/bamboo-molecules';

import { weakMemoized } from '../../utils';
import { useRecordType } from '../../contexts';
import { GroupFooterRow } from './GroupFooterRenderer';
import { GroupHeaderRow } from './GroupHeaderRenderer';
import { DataGridRowRendererProps, RowType } from '../../types';
import { withSpacers } from './Spacer';
import { TableRow } from './RowRenderer';

/**
 *
 * If the factory function uses the default row renderer which is a part of DataTable Component.
 * To add a separate DataRow renderer, inject it using a custom useRowRenderer passed to the DataGrid component.
 *
 */
const renderers: Partial<Record<RowType, ComponentType<DataGridRowRendererProps>>> = {
    [RowType.FOOTER]: GroupFooterRow,
    [RowType.HEADER]: GroupHeaderRow,
    [RowType.DATA]: TableRow,
};

const getRowWithSpacers = weakMemoized((Row: ComponentType<DataGridRowRendererProps>) =>
    withSpacers(Row),
);

export const useRowRendererDefault: UseRowRenderer<DataGridRowRendererProps> = (
    props,
    DefaultRenderer,
) => {
    const rowType = useRecordType(props.rowId);
    return getRowWithSpacers(renderers[rowType] ?? DefaultRenderer);
};
