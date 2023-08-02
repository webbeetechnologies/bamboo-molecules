import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    Pressable,
    PressableProps,
    ViewStyle,
    GestureResponderEvent,
} from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import {
    RenderCellProps,
    useMolecules,
    CallbackActionState,
    withActionState,
    useDataTableCell,
} from '@bambooapp/bamboo-molecules';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import {
    useFieldType,
    useTableManagerStoreRef,
    useIsCellFocused,
    useField,
    useCellValue,
} from '../../contexts';
import { useContextMenu } from '../../hooks';
import { ViewRenderer, EditRenderer } from '../FieldRenderers';
import { DragAndExtendHandle } from '../DragAndExtendHandle';
import { useSelectionMethods } from '../../plugins';
import { CellSelectionIndicator } from '../CellSelectionIndicator';
import { CellBorder } from '../CellBorder';

export type Props = RenderCellProps &
    CallbackActionState &
    Omit<PressableProps, 'ref'> & {
        innerContainerProps?: Partial<ViewProps>;
    };

const emptyObj = {};

const _DataCell = (
    { hovered = false, innerContainerProps = emptyObj, style, ...rest }: Props,
    ref: any,
) => {
    const { View } = useMolecules();

    const cellRef = useRef<any>(null);

    const { column, row, rowIndex, columnIndex } = useDataTableCell();

    const { type, ...restField } = useField(column);
    const { readonly, displayEditorOnHover, showEditor } = useFieldType(type);
    const [isFocused, setFocusedCell] = useIsCellFocused(row, column);
    const { set: setTableManagerStore } = useTableManagerStoreRef();

    const { useOnSelectCell } = useSelectionMethods();
    const onSelectCell = useOnSelectCell();
    // const onDragAndSelectStart = useOnDragAndSelectStart();
    // const onDragAndSelectEnd = useOnDragAndSelectEnd();

    const isTappedRef = useRef(0);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useCellValue(row, column);

    const onFocus = useCallback(
        (e: GestureResponderEvent) => {
            const cell = { columnId: column, rowId: row, columnIndex, rowIndex };

            if ((e as unknown as MouseEvent).shiftKey) {
                onSelectCell(cell);
                return;
            }

            setFocusedCell({
                ...cell,
                type: 'cell',
            });
        },
        [column, columnIndex, onSelectCell, row, rowIndex, setFocusedCell],
    );

    const onPress = useCallback(
        (e: GestureResponderEvent) => {
            const delta = new Date().getTime() - isTappedRef.current;

            if (delta < 500) {
                if (readonly || displayEditorOnHover) return;

                setIsEditing(prev => !prev);

                return;
            }

            isTappedRef.current = new Date().getTime();

            onFocus(e);
        },
        [displayEditorOnHover, onFocus, readonly],
    );

    const displayViewRenderer = useMemo(() => {
        if (readonly) return true;

        return showEditor
            ? !showEditor({ hovered, focused: isFocused, doubleTapped: isEditing })
            : !isEditing;
    }, [hovered, isEditing, isFocused, readonly, showEditor]);

    const { containerStyle, innerContainerStyle } = useMemo(
        () => ({
            containerStyle: [styles.cellContainer, style] as ViewStyle,
            innerContainerStyle: [
                styles.cell,
                !isEditing ? styles.centered : styles.editContainer,
                innerContainerProps.style,
            ] as ViewStyle,
        }),
        [style, isEditing, innerContainerProps.style],
    );

    const onDrag = useMemo(() => {
        return Gesture.Pan()
            .onBegin(() => {
                // onDragAndSelectStart({
                //     rowIndex,
                //     columnIndex,
                //     columnId: column,
                //     rowId: row,
                // });
            })
            .onEnd(() => {
                // onDragAndSelectEnd();
            });
    }, []);

    useEffect(() => {
        if (isFocused || !isEditing) return;

        setIsEditing(false);
    }, [isEditing, isFocused]);

    const handleContextMenu = useCallback(() => {
        onFocus({} as GestureResponderEvent);
        setTableManagerStore(() => ({
            focusedCellRef: cellRef,
        }));
    }, [onFocus, setTableManagerStore]);

    useContextMenu({ ref: cellRef, callback: handleContextMenu });

    return (
        <GestureDetector gesture={onDrag}>
            <Pressable ref={cellRef} onPress={onPress} style={containerStyle} {...rest}>
                <View ref={ref} style={innerContainerStyle} {...innerContainerProps}>
                    {displayViewRenderer ? (
                        <ViewRenderer value={value} type={type} {...restField} />
                    ) : (
                        <EditRenderer
                            value={value}
                            type={type}
                            onChange={setValue}
                            {...restField}
                        />
                    )}

                    <CellBorder
                        isFocused={isFocused}
                        columnIndex={columnIndex}
                        rowIndex={rowIndex}
                    />
                    <DragAndExtendHandle style={styles.dragHandle} isFocused={isFocused} />
                    <CellSelectionIndicator hovered={hovered} />
                </View>
            </Pressable>
        </GestureDetector>
    );
};

const DataCell = withActionState(forwardRef(_DataCell));

const CellRendererWithStyledHeight = forwardRef((props: Props, ref: any) => (
    <DataCell {...props} ref={ref} actionStateContainerProps={actionContainerProps} />
));

const actionContainerProps = { style: { height: '100%' } };

const styles = StyleSheet.create({
    cellContainer: {
        height: '100%',
    },
    cell: {
        flex: 1,
        padding: 4,
    },
    editContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        minHeight: '100%',
        width: '100%',
    },
    focused: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'blue',
        backgroundColor: 'colors.surface',
        height: '100%',
    },
    centered: {
        justifyContent: 'center',
    },
    dragHandle: {
        position: 'absolute',
        bottom: -3.5,
        right: -3.5,
    },
});

export default memo(CellRendererWithStyledHeight);
