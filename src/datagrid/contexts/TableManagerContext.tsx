import { createRef, memo, PropsWithChildren, RefObject, useMemo } from 'react';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import type { GroupedData, GroupFooter } from '../utils';
import { weakMemoized, keyBy, GroupMeta } from '../utils';
import { shallowCompare } from '../../utils';

export type TableManagerContextProviderProps = {
    withContextMenu: boolean;
    records: GroupedData[];
    tableRef: RefObject<any>;
    spacerWidth: number;
    focusIgnoredColumns?: TDataTableColumn[];
};

export type TableManagerContextType = TableManagerContextProviderProps & {
    tableFlatListRef: RefObject<any>;
};

const defaultContextValue = {
    focusedCell: null,
    focusedCellRef: null,
    isEditing: false,
    withContextMenu: false,
    spacerWidth: 0,
    records: [],
    tableRef: createRef(),
    tableFlatListRef: createRef(),
    focusIgnoredColumns: [],
};

export const {
    Provider: TableManagerContextProvider,
    useContext: useTableManagerSelector,
    useContextValue: useTableManagerValueSelector,
    useStoreRef,
} = createFastContext<TableManagerContextType>(defaultContextValue, true);

export const TableManagerProvider = memo(
    ({
        tableRef,
        withContextMenu,
        children,
        spacerWidth,
        records,
        focusIgnoredColumns,
    }: PropsWithChildren<TableManagerContextProviderProps>) => {
        const contextValue = useMemo(
            () =>
                ({
                    tableRef,
                    withContextMenu,
                    records,
                    spacerWidth,
                    focusIgnoredColumns,
                } as TableManagerContextType),
            [tableRef, withContextMenu, records, spacerWidth, focusIgnoredColumns],
        );

        return (
            <TableManagerContextProvider value={contextValue}>
                {children}
            </TableManagerContextProvider>
        );
    },
);

export const useTableManagerStoreRef = useStoreRef;

export const useShouldContextMenuDisplayed = () => {
    return useTableManagerValueSelector(store => store.withContextMenu);
};

export const useRecordIds = () => {
    return useTableManagerValueSelector(
        ({ records }) => records.map(({ id }) => id),
        shallowCompare,
    );
};

type GroupedDataMap = Record<TDataTableColumn, GroupedData>;
const getRecordsMap = weakMemoized((records: GroupedData[]) => keyBy(records, 'uniqueId')) as (
    records: GroupedData[],
) => GroupedDataMap;

const getRecordById = (records: GroupedData[], id: TDataTableRow) => getRecordsMap(records)[id];

export const useRecordsMap = () => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records));
};

export const useRecordById = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordById(records, id));
};

export const useHasGroupedData = () => {
    return useTableManagerValueSelector(({ records }) => !!records.at(0)?.groupId);
};

export const useGroupMeta = (id: TDataTableRow): GroupMeta => {
    return useTableManagerValueSelector(({ records }) => {
        const record = getRecordById(records, id) as GroupFooter;

        return {
            groupId: record.groupId,
            fieldId: record.fieldId,
            value: record.title,
            count: record.count,
            isFirst: record.isFirst,
            isLast: record.isLast,
            isFirstLevel: record.isFirstLevel,
            isLastLevel: record.isLastLevel,
            isOnly: record.isOnly,
            title: record.title,
            level: record.level,
            groupConstants: record.groupConstants,
            rowType: record.rowType,
            isRealGroup: record.isRealGroup,
        };
    }, shallowCompare);
};

export const useRecordType = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records)[id].rowType);
};

export const useRecord = <T extends unknown>(
    id: TDataTableRow,
    selector: (arg: GroupedData) => T,
) => {
    return useTableManagerValueSelector(({ records }) => selector(getRecordById(records, id)));
};
