import { RowType, weakMemoized } from '../../utils';
import { createUseRowRenderer } from '../../contexts';
import { GroupFooterRow } from './GroupFooterRenderer';
import { GroupHeaderRow } from './GroupHeaderRenderer';
import type { ComponentType } from 'react';
import type { UseRowRenderer } from '@bambooapp/bamboo-molecules';
import type { DataGridRowRendererProps } from '../../types';
import { withSpacers } from './Spacer';

const useRowRendererLocal = createUseRowRenderer({
    [RowType.FOOTER]: GroupFooterRow,
    [RowType.HEADER]: GroupHeaderRow,
});

const getRowWithSpacers = weakMemoized((Row: ComponentType<DataGridRowRendererProps>) =>
    withSpacers(Row),
);

export const useRowRenderer: UseRowRenderer<DataGridRowRendererProps> = (props, Component) => {
    return getRowWithSpacers(useRowRendererLocal(props, Component));
};
