import { CallbackActionState, useMolecules, withActionState } from '@bambooapp/bamboo-molecules';
import { memo, useMemo, useRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDataTableColumnWidth, TDataTableColumn } from '@bambooapp/bamboo-molecules/components';

import {
    COLUMN_RESIZE_PLUGIN_KEY,
    useColumnResizeEvents,
    useColumnResizeMethods,
    usePluginsDataStoreRef,
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

        const { store, set: setStore } = usePluginsDataStoreRef();
        const { useIsColumnResizing } = useColumnResizeMethods();

        const isResizing = useIsColumnResizing(column);
        const columnWidth = useDataTableColumnWidth(column);
        const columnWidthRef = useRef<{ initial: number | null; new: number | null }>({
            initial: null,
            new: null,
        });
        const { beforeColumnResize, onColumnResize, afterColumnResize } = useColumnResizeEvents();

        const onPanHandle = useMemo(
            () =>
                Gesture.Pan()
                    .onBegin(() => {
                        const shouldContinue = beforeColumnResize({
                            columnId: column,
                            columnIndex,
                        });

                        if (shouldContinue === false) return;

                        columnWidthRef.current.initial = columnWidth;

                        setStore(prev => ({
                            [COLUMN_RESIZE_PLUGIN_KEY]: {
                                ...prev[COLUMN_RESIZE_PLUGIN_KEY],
                                resizingColumn: column,
                            },
                        }));
                    })
                    .onUpdate(({ translationX }) => {
                        if (store.current[COLUMN_RESIZE_PLUGIN_KEY]?.resizingColumn !== column)
                            return;

                        columnWidthRef.current.new = Math.max(
                            (columnWidthRef.current.initial ?? 0) + translationX,
                            1,
                        );
                        onColumnResize({
                            columnId: column,
                            columnIndex,
                            width: Math.max(columnWidthRef.current.new),
                        });
                    })
                    .onEnd(() => {
                        afterColumnResize({
                            columnId: column,
                            columnIndex,
                            width: columnWidthRef.current.new,
                        });
                    })
                    .onFinalize(() => {
                        //cleanup
                        columnWidthRef.current.initial = null;
                        columnWidthRef.current.new = null;

                        setStore(prev => ({
                            [COLUMN_RESIZE_PLUGIN_KEY]: {
                                ...prev[COLUMN_RESIZE_PLUGIN_KEY],
                                resizingColumn: null,
                            },
                        }));
                    }),
            [
                beforeColumnResize,
                column,
                columnIndex,
                columnWidth,
                setStore,
                store,
                onColumnResize,
                afterColumnResize,
            ],
        );

        const { handleStyle } = useMemo(
            () => ({
                handleStyle: [
                    styles.handle,
                    !(hovered || isResizing) && { display: 'none' },
                    style,
                ] as ViewStyle,
            }),
            [isResizing, hovered, style],
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

export default memo(withPluginExistenceCheck(ColumnResizeHandle, COLUMN_RESIZE_PLUGIN_KEY));
