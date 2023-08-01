import { ComponentType, memo, useMemo } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useDataTableCell } from '@bambooapp/bamboo-molecules';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';

import {
    cellSelectionPluginKey,
    usePluginsDataSelector,
    usePluginsDataValueSelectorValue,
} from '../../plugins';
import { dragAndExtendKey } from '../../plugins/drag-and-extend';

export type Props = ViewProps & {
    isFocused: boolean;
    columnId: TDataTableColumn;
    rowId: TDataTableRow;
};

const DragAndExtendHandle = ({ style, ...rest }: ViewProps) => {
    const cell = useDataTableCell();
    const [_, setStore] = usePluginsDataSelector(store => store[dragAndExtendKey]);

    const onPanHandle = useMemo(
        () =>
            Gesture.Pan()
                .onBegin(() =>
                    setStore(prev => ({
                        selection: {
                            ...prev.selection,
                            currentCell: cell,
                        },
                    })),
                )
                .onEnd(() =>
                    setStore(prev => ({
                        selection: {
                            ...prev.selection,
                            currentCell: null,
                        },
                    })),
                ),
        [cell, setStore],
    );

    const handleStyle = useMemo(
        () => [
            styles.handle,
            {
                cursor: 'crosshair',
            },
            style,
        ],
        [style],
    );

    return (
        <GestureDetector gesture={onPanHandle}>
            {/* @ts-ignore*/}
            <Animated.View style={handleStyle} {...rest} />
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
        backgroundColor: '#fff',
        borderColor: '#5C6AE7',
        borderWidth: 1,
    },
});

export default memo(withVisibilityCheck(DragAndExtendHandle));
