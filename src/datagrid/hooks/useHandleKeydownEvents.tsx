import { RefObject, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { isMac } from '@bambooapp/bamboo-molecules';

import { useTableManagerStoreRef } from '../contexts';

import {
    CELL_FOCUS_PLUGIN_KEY,
    CELL_SELECTION_PLUGIN_KEY,
    TableSelection,
    useCopyPasteEvents,
    usePluginsDataStoreRef,
} from '../plugins';
import { useNormalizeSelectionHandler } from '../plugins/utils';
import { isDataRow, GroupRecord, getRecordByIndex } from '../utils';
import type { TableManagerContextType } from '../contexts/TableManagerContext';

export type Props = {
    ref: RefObject<HTMLDivElement>;
};

const createOSKeyMap = (e: KeyboardEvent) => ({
    true: {
        copy: e.metaKey && e.key === 'c' && !e.altKey && !e.shiftKey && !e.ctrlKey,
        paste: e.metaKey && e.key === 'v' && !e.altKey && !e.shiftKey && !e.ctrlKey,
    },
    false: {
        copy: e.ctrlKey && e.key === 'c' && !e.altKey && !e.shiftKey && !e.metaKey,
        paste: e.metaKey && e.key === 'v' && !e.altKey && !e.shiftKey && !e.ctrlKey,
    },
});

const useHandleKeydownEvents = ({ ref }: Props) => {
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: pluginDataStore } = usePluginsDataStoreRef();

    const { beforeCopyCell, onCopyCell, beforePasteCell, onPasteCell } = useCopyPasteEvents();
    const normalizeSelection = useNormalizeSelectionHandler();

    const onKeydown = useCallback(
        (e: KeyboardEvent) => {
            const isMacOs = isMac();
            const osKeyMap = createOSKeyMap(e)[String(isMacOs) as 'true' | 'false'];

            if (
                !pluginDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell ||
                pluginDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell.type === 'column' ||
                pluginDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.isEditing
            )
                return;

            const selection = normalizeSelection(
                pluginDataStore.current[CELL_SELECTION_PLUGIN_KEY] || {
                    start: pluginDataStore.current[CELL_FOCUS_PLUGIN_KEY].focusedCell,
                    end: pluginDataStore.current[CELL_FOCUS_PLUGIN_KEY].focusedCell,
                },
            );

            const continueCopy = beforeCopyCell({
                selection,
            });

            if (osKeyMap.copy && continueCopy !== false) {
                onCopyCell({ selection });
            }

            const continuePaste = beforePasteCell({
                selection,
            });
            if (osKeyMap.paste && continuePaste !== false) {
                onPasteCell({
                    selection: normalizeSelectionForGrouping(selection, tableManagerStore),
                });
            }
        },
        [
            tableManagerStore,
            normalizeSelection,
            pluginDataStore,
            beforeCopyCell,
            beforePasteCell,
            onCopyCell,
            onPasteCell,
        ],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const triggerRef = ref?.current as unknown as HTMLDivElement;

        triggerRef?.addEventListener('keydown', onKeydown);

        return () => {
            triggerRef?.removeEventListener('keydown', onKeydown);
        };
    }, [onKeydown, ref]);
};

const normalizeSelectionForGrouping = (
    { start, end, ...rest }: TableSelection,
    store: React.MutableRefObject<TableManagerContextType>,
) => {
    // Normalize selection in case of grouping
    const getRowData = (index: number): GroupRecord => {
        const record = getRecordByIndex(store.current.records, index);
        if (!isDataRow(record)) throw new Error('Record is not a data row');
        return record;
    };

    const {
        index: startIndex,
        indexInGroup: startRowIndexInGroup,
        groupConstants,
    } = getRowData(start.rowIndex);

    const { index: endIndex, indexInGroup: endRowIndexInGroup } = getRowData(end.rowIndex);

    return {
        ...rest,
        start: {
            ...start,
            rowIndex: startIndex,
            rowIndexInGroup: startRowIndexInGroup,
        },
        end: {
            ...end,
            rowIndex: endIndex,
            rowIndexInGroup: endRowIndexInGroup,
        },
        groupConstants,
    };
};

export default useHandleKeydownEvents;
