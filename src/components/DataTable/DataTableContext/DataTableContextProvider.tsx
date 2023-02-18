import type { FC, PropsWithChildren } from 'react';
import { memo, useMemo, useRef } from 'react';
import { DataTableComponentContext, DataTableContext } from './DataTableContext';
import type { DataTableProps } from '../types';
import { useMolecules } from '../../../hooks';
import { ScrollView } from 'react-native-gesture-handler';

export const DataTableContextProvider: FC<PropsWithChildren<DataTableProps>> = memo(
    ({
        records,
        columns,
        children,
        defaultColumnWidth = 150,
        FlatListComponent: FlatListComponentProp,
        ScrollViewComponent: ScrollViewComponentProp,
        renderCell: renderCellProp,
        renderHeader: renderHeaderProp,
    }) => {
        const { FlatList } = useMolecules();

        const FlatListComponent = useRef(
            FlatListComponentProp ?? (FlatList as Required<DataTableProps>['FlatListComponent']),
        ).current;

        // TODO: Adopt ScrollView from Molecules.
        const ScrollViewComponent = useRef(ScrollViewComponentProp ?? ScrollView).current;
        const renderCell = useRef(renderCellProp).current;
        const renderHeader = useRef(renderHeaderProp).current;

        const components = useMemo(
            () => ({ FlatListComponent, ScrollViewComponent, renderCell, renderHeader }),
            [FlatListComponent, ScrollViewComponent, renderCell, renderHeader],
        );

        const tableWidth = Math.min(columns.length * defaultColumnWidth);
        const dataContext = useMemo(
            () => ({
                records,
                columns,
                tableWidth,
                defaultColumnWidth,
            }),
            [records, columns, tableWidth, defaultColumnWidth],
        );

        return (
            <DataTableComponentContext.Provider value={components}>
                <DataTableContext.Provider value={dataContext}>
                    {children}
                </DataTableContext.Provider>
            </DataTableComponentContext.Provider>
        );
    },
);
