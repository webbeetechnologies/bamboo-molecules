import { createContext, memo, ReactNode, useContext } from 'react';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';

import type {
    DataGridRowRendererProps,
    Field,
    GroupMeta,
    UseGroupRowState,
    UseRowRenderer,
    UseShowGroupFooter,
} from '../types';
import type { RecordWithId } from '../utils';

export type HooksContextType = {
    useField: (columnId: TDataTableColumn) => Field;
    useRowRenderer?: UseRowRenderer<DataGridRowRendererProps>;
    useShowGroupFooter?: UseShowGroupFooter;
    useGroupRowState?: UseGroupRowState;
    useCellValue: (
        rowId: TDataTableRow,
        columnId: TDataTableColumn,
    ) => readonly [
        RecordWithId,
        (newValue: Partial<RecordWithId> & Pick<RecordWithId, 'id'>) => void,
    ];
};

const HooksContext = createContext<HooksContextType | null>(null);

const useHooks = () => {
    const contextValue = useContext(HooksContext);

    if (contextValue === null) throw new Error('useHooks should be used inside the HooksProvider');

    return contextValue;
};

export const useField: HooksContextType['useField'] = id => {
    const { useField: useFieldProp } = useHooks();
    return useFieldProp(id);
};

export const useCellValue: HooksContextType['useCellValue'] = (rowId, columnId) => {
    const { useCellValue: useCellValueProp } = useHooks();
    return useCellValueProp(rowId, columnId);
};

export const useRowRenderer: UseRowRenderer = (rowRendererProps, DefaultRowComponent) => {
    const { useRowRenderer: useRowRendererProp } = useHooks();
    return useRowRendererProp?.(rowRendererProps, DefaultRowComponent);
};

export const useShowGroupFooter: UseShowGroupFooter = (meta: GroupMeta) => {
    const defaultFunction: UseShowGroupFooter = () => false;
    const { useShowGroupFooter: useShowGroupFooterProp = defaultFunction } = useHooks();

    return useShowGroupFooterProp(meta);
};

const useGroupRowStateDefault: UseGroupRowState = meta => ({
    isOnly: meta.isOnly,
    isFirst: meta.isFirst,
    isLast: meta.isLast,
    isFirstLevel: meta.isFirstLevel,
    isLastLevel: meta.isLastLevel,
});

export const useGroupRowState: UseGroupRowState = meta => {
    const { useGroupRowState: useGroupRowStateProp = useGroupRowStateDefault } = useHooks();
    return useGroupRowStateProp(meta);
};

export const HooksProvider = memo(
    ({ value, children }: { value: HooksContextType; children: ReactNode }) => {
        return <HooksContext.Provider value={value}>{children}</HooksContext.Provider>;
    },
);
