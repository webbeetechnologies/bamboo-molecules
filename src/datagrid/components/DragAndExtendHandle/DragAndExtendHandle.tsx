import { memo, useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useDataTableCell, useMolecules } from '@bambooapp/bamboo-molecules';

import {
    withPluginExistenceCheck,
    DRAG_AND_EXTEND_PLUGIN_KEY,
    useDragAndExtendMethods,
} from '../../plugins';

export type Props = ViewProps & {
    isFocused: boolean;
};

const DragAndExtendHandle = ({ style, isFocused, ...rest }: Props) => {
    const { View } = useMolecules();

    const { columnIndex, rowIndex } = useDataTableCell();
    const { useIsDragHandleVisible } = useDragAndExtendMethods();

    const isVisible = useIsDragHandleVisible({ columnIndex, rowIndex, isFocused });

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
        width: 8,
        height: 8,
        backgroundColor: 'colors.neutral1',
        borderColor: 'colors.primary',
        borderRadius: 3,
        borderWidth: 1,
    },
});

export default memo(withPluginExistenceCheck(DragAndExtendHandle, DRAG_AND_EXTEND_PLUGIN_KEY));
