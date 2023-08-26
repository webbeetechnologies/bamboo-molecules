import { ComponentType, FC, memo } from 'react';
import type { RenderCellProps, RenderHeaderCellProps } from '../types';
import { generateFlatListData } from '../../../../__mocks__/generateFlatListData';
import type { FlatListProps } from 'react-native';
import { useMolecules } from '../../../hooks';
import type { ViewAbilityConfigPair } from 'src/datagrid/types';

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

export const getDataTableMockProps = (
    rows: number,
    columns: number,
    FlatListComponent?: ComponentType<
        Omit<FlatListProps<any>, 'viewabilityConfigCallbackPairs'> & {
            viewabilityConfigCallbackPairs: ViewAbilityConfigPair[];
        }
    >,
) => ({
    rowSize: 'sm',
    columns: generateFlatListData(columns, index => `column-${index}`),
    records: generateFlatListData(rows, index => `row-${index}`),
    selectedRows: {
        'row-5': true,
        'row-13': true,
        'row-15': true,
    },
    FlatListComponent,
    renderCell: (props: RenderCellProps) => <CellRenderer {...props} />,
    renderHeader: (props: RenderHeaderCellProps) => <HeaderRenderer {...props} />,
});
