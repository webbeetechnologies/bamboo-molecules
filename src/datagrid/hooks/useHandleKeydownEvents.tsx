import { useCallback, useEffect, RefObject } from 'react';
import { Platform } from 'react-native';
import { useTableManagerStoreRef } from '../contexts';

import { cellSelectionPluginKey, useCopyPasteEvents, usePluginsDataStoreRef } from '../plugins';
import { isMac } from '../utils';

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
    const { store } = useTableManagerStoreRef();
    const { store: pluginDataStore } = usePluginsDataStoreRef();

    const { beforeCopyCell, onCopyCell, beforePasteCell, onPasteCell } = useCopyPasteEvents();

    const onKeydown = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            const isMacOs = isMac();
            const osKeyMap = createOSKeyMap(e)[String(isMacOs) as 'true' | 'false'];

            if (!store.current.focusedCell || store.current.focusedCell.type === 'column') return;

            const selection = pluginDataStore.current[cellSelectionPluginKey] || {
                start: store.current.focusedCell,
                end: store.current.focusedCell,
            };

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
                    selection,
                });
            }
        },
        [beforeCopyCell, beforePasteCell, onCopyCell, onPasteCell, store, pluginDataStore],
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

export default useHandleKeydownEvents;
