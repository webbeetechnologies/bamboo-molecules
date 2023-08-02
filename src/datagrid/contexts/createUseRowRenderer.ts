import type { ComponentType } from 'react';
import type { UseRowRenderer } from '@bambooapp/bamboo-molecules';
import type { RowType } from '../utils';
import { useRowRenderer } from './HooksContext';
import { useRecordType } from './TableManagerContext';
import type { DataGridRowRendererProps } from '../types';

type CreateUseRowRenderer = (
    renderers: Partial<Record<RowType, ComponentType<DataGridRowRendererProps>>>,
) => UseRowRenderer<DataGridRowRendererProps>;

export const createUseRowRenderer: CreateUseRowRenderer = renderers => (props, DefaultRenderer) => {
    const rowType = useRecordType(props.rowId);
    const RowRenderer = useRowRenderer(props, DefaultRenderer);

    return RowRenderer ?? renderers[rowType] ?? DefaultRenderer;
};
