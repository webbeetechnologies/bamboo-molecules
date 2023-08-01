import { useCallback, useEffect, RefObject } from 'react';
import { Platform } from 'react-native';
import { useTableManagerStoreRef } from '../contexts';

import { Selection, useCopyPasteEvents } from '../plugins';
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

    const { beforeCopyCell, onCopyCell, beforePasteCell, onPasteCell } = useCopyPasteEvents();

    const onKeydown = useCallback(
        (e: KeyboardEvent) => {
            e.preventDefault();

            const isMacOs = isMac();
            const osKeyMap = createOSKeyMap(e)[`${isMacOs}` as 'true' | 'false'];

            // TODO - selection need to come from selection plugin
            if (!store.current.focusedCell || store.current.focusedCell.type === 'column') return;

            const continueCopy = beforeCopyCell({
                selection: [store.current.focusedCell] as Selection,
            });

            if (osKeyMap.copy && continueCopy !== false) {
                onCopyCell({ selection: [store.current.focusedCell] as Selection });
            }

            const continuePaste = beforePasteCell({
                selection: [store.current.focusedCell] as Selection,
            });
            if (osKeyMap.paste && continuePaste !== false) {
                onPasteCell({
                    selection: [store.current.focusedCell] as Selection,
                });
            }
        },
        [beforeCopyCell, beforePasteCell, onCopyCell, onPasteCell, store],
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
