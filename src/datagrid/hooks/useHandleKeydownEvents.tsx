import { RefObject, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useTableManagerStoreRef } from '../contexts';

import {
    CELL_SELECTION_PLUGIN_KEY,
    TableSelection,
    useCopyPasteEvents,
    usePluginsDataStoreRef,
} from '../plugins';
import { useNormalizeSelectionHandler } from '../plugins/utils';
import { GroupRecord, isMac } from '../utils';
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
                !tableManagerStore.current.focusedCell ||
                tableManagerStore.current.focusedCell.type === 'column'
            )
                return;

            const selection = normalizeSelection(
                pluginDataStore.current[CELL_SELECTION_PLUGIN_KEY] || {
                    start: tableManagerStore.current.focusedCell,
                    end: tableManagerStore.current.focusedCell,
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
    const getCorrectRowIndex = (index: number) => {
        if (store.current.records[index].rowType === 'data') return index;
        throw new Error('Record is not a data row');
    };

    const correctStartRowIndex = getCorrectRowIndex(start.rowIndex);
    const {
        index: startIndex,
        indexInGroup: startRowIndexInGroup,
        groupConstants,
    } = store.current.records[correctStartRowIndex] as GroupRecord;

    const correctEndRowIndex = getCorrectRowIndex(end.rowIndex);
    const { index: endIndex, indexInGroup: endRowIndexInGroup } = store.current.records[
        correctEndRowIndex
    ] as GroupRecord;

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
