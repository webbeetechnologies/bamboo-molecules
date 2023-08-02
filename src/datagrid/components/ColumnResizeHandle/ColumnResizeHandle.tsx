import {
    CallbackActionState,
    useDataTable,
    useMolecules,
    withActionState,
} from '@bambooapp/bamboo-molecules';
import { memo, useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { TDataTableColumn } from '@bambooapp/bamboo-molecules/components';

import {
    columnResizePluginKey,
    useColumnResizeEvents,
    withPluginExistenceCheck,
} from '../../plugins';

export type Props = ViewProps &
    CallbackActionState & {
        column: TDataTableColumn;
        columnIndex: number;
    };

const ColumnResizeHandleComponent = withActionState(
    ({ hovered, style, column, columnIndex, ...rest }: Props) => {
        const { View } = useMolecules();

        const columnWidth = useDataTable(store => store.columnWidths?.[column] || 150);
        const initialColumnWidth = useRef(0);
        const { beforeColumnResize, onColumnResize, afterColumnResize } = useColumnResizeEvents();

        const onPanHandle = useMemo(
            () =>
                Gesture.Pan()
                    .onBegin(() => {
                        initialColumnWidth.current = columnWidth;

                        // TODO - add cancellation
                        beforeColumnResize();
                    })
                    .onUpdate(({ translationX }) => {
                        onColumnResize({
                            columnId: column,
                            columnIndex,
                            width: initialColumnWidth.current + translationX,
                        });
                    })
                    .onEnd(() => {
                        afterColumnResize();
                    }),
            [
                afterColumnResize,
                beforeColumnResize,
                column,
                columnIndex,
                columnWidth,
                onColumnResize,
            ],
        );

        const { handleStyle } = useMemo(
            () => ({
                handleStyle: [styles.handle, !hovered && { display: 'none' }, style] as ViewStyle,
            }),
            [hovered, style],
        );

        return (
            <GestureDetector gesture={onPanHandle}>
                <View style={handleStyle} {...rest} />
            </GestureDetector>
        );
    },
);

const ColumnResizeHandle = ({
    actionStateContainerProps: _actionStateContainerProps,
    ...rest
}: Props) => {
    const actionStateContainerProps = useMemo(
        () =>
            ({
                ..._actionStateContainerProps,
                style: [styles.container, _actionStateContainerProps?.style],
            } as ViewProps),
        [_actionStateContainerProps],
    );

    return (
        <ColumnResizeHandleComponent
            {...rest}
            actionStateContainerProps={actionStateContainerProps}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: -4,
        width: 10,
        alignItems: 'center',
    },
    handle: {
        height: '100%',
        width: '50%',
        borderRadius: 2,
        cursor: 'ew-resize',
        backgroundColor: 'colors.primary',
    },
});

export default memo(withPluginExistenceCheck(ColumnResizeHandle, columnResizePluginKey));
