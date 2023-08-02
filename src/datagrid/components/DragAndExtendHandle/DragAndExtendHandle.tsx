import { memo, useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useDataTableCell, useMolecules } from '@bambooapp/bamboo-molecules';

import {
    cellSelectionPluginKey,
    usePluginsDataValueSelectorValue,
    withPluginExistenceCheck,
    dragAndExtendKey,
    useDragAndExtendMethods,
} from '../../plugins';

export type Props = ViewProps & {
    isFocused: boolean;
};

const DragAndExtendHandle = ({ style, isFocused, ...rest }: Props) => {
    const { View } = useMolecules();

    const { column: columnId, columnIndex, rowIndex, row: rowId } = useDataTableCell();

    const isVisible = usePluginsDataValueSelectorValue(store => {
        const selection = store[cellSelectionPluginKey];
        const dragSelection = store[dragAndExtendKey];

        if (dragSelection?.end) {
            return (
                dragSelection.end.columnIndex === columnIndex &&
                dragSelection.end.rowIndex === rowIndex
            );
        }

        if (!selection || !selection.end) return isFocused;

        return selection.end.columnId === columnId && selection.end.rowId === rowId;
    });

    const ref = useRef(null);

    const { useOnDragStart, useOnDragEnd } = useDragAndExtendMethods();
    const onDragEnd = useOnDragEnd();
    const onDragStart = useOnDragStart();

    const onPanHandle = useMemo(
        () =>
            Gesture.Pan()
                .onBegin(() => {
                    onDragStart();
                })
                .onEnd(() => {
                    onDragEnd();
                }),
        [onDragEnd, onDragStart],
    );

    const handleStyle = useMemo(
        () =>
            [
                styles.handle,
                {
                    cursor: 'crosshair',
                },
                !isVisible && { display: 'none' },
                style,
            ] as ViewStyle,
        [isVisible, style],
    );

    return (
        <GestureDetector gesture={onPanHandle}>
            {/* nativeID is required for cell-selection reset listener */}
            <View style={handleStyle} ref={ref} nativeID="drag-handle" {...rest} />
        </GestureDetector>
    );
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

export default memo(withPluginExistenceCheck(DragAndExtendHandle, dragAndExtendKey));
