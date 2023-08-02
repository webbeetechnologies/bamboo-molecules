import { ComponentType, memo, useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';

import {
    cellSelectionPluginKey,
    copyPastePluginKey,
    useCopyPasteEvents,
    usePluginsDataStoreRef,
    usePluginsDataValueSelectorValue,
    withPluginExistenceCheck,
    dragAndExtendKey,
    useDragAndExtendEvents,
} from '../../plugins';

export type Props = ViewProps & {
    isFocused: boolean;
    columnId: TDataTableColumn;
    rowId: TDataTableRow;
};

const DragAndExtendHandle = ({ style, ...rest }: ViewProps) => {
    const { View } = useMolecules();

    const ref = useRef(null);
    const { store, set: setStore } = usePluginsDataStoreRef();
    const {
        beforeCopyCell,
        onCopyCell,
        afterCopyCell,
        beforePasteCell,
        onPasteCell,
        afterPasteCell,
    } = useCopyPasteEvents() || {};
    const { afterDragAndExtend } = useDragAndExtendEvents() || {};

    const onPanHandle = useMemo(
        () =>
            Gesture.Pan()
                .onBegin(() =>
                    setStore(prev => ({
                        [dragAndExtendKey]: {
                            ...prev[dragAndExtendKey],
                            start: {},
                        },
                    })),
                )
                .onEnd(() => {
                    const copySelection = store.current[copyPastePluginKey];
                    const pasteSelection = store.current[dragAndExtendKey];

                    const continueCopy = beforeCopyCell({ selection: copySelection });

                    if (continueCopy !== false) {
                        onCopyCell({ selection: copySelection });

                        afterCopyCell();
                    }

                    const continuePaste = beforePasteCell({ selection: copySelection });

                    if (continuePaste !== false) {
                        onPasteCell({ selection: pasteSelection });

                        afterPasteCell();
                    }

                    setStore(prev => ({
                        [dragAndExtendKey]: {
                            ...prev[dragAndExtendKey],
                            start: undefined,
                            end: undefined,
                        },
                    }));

                    afterDragAndExtend();
                }),
        [
            afterCopyCell,
            afterDragAndExtend,
            afterPasteCell,
            beforeCopyCell,
            beforePasteCell,
            onCopyCell,
            onPasteCell,
            setStore,
            store,
        ],
    );

    const handleStyle = useMemo(
        () =>
            [
                styles.handle,
                {
                    cursor: 'crosshair',
                },
                style,
            ] as ViewStyle,
        [style],
    );

    return (
        <GestureDetector gesture={onPanHandle}>
            {/* nativeID is required for cell-selection reset listener */}
            <View style={handleStyle} ref={ref} nativeID="drag-handle" {...rest} />
        </GestureDetector>
    );
};

const withVisibilityCheck = (Component: ComponentType<ViewProps>) => {
    return ({ isFocused, columnId, rowId, ...rest }: Props) => {
        const isVisible = usePluginsDataValueSelectorValue(store => {
            const selection = store[cellSelectionPluginKey];

            if (!selection || !selection.end) return isFocused;

            return selection.end.columnId === columnId && selection.end.rowId === rowId;
        });

        if (!isVisible) return <></>;

        return <Component {...rest} />;
    };
};

const styles = StyleSheet.create({
    handle: {
        width: 10,
        height: 10,
        backgroundColor: 'colors.neutral1',
        borderColor: 'colors.primary',
        borderWidth: 1,
        zIndex: 1,
    },
});

export default memo(
    withPluginExistenceCheck(withVisibilityCheck(DragAndExtendHandle), dragAndExtendKey),
);
