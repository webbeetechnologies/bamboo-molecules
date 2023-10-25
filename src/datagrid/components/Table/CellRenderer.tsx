import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, ReactNode } from 'react';
import { StyleSheet, ViewStyle, GestureResponderEvent } from 'react-native';
import type { ViewProps, PressableProps } from '@bambooapp/bamboo-atoms';
import {
    RenderCellProps,
    useMolecules,
    useDataTableCell,
    useActionState,
    useLatest,
    WithElements,
} from '@bambooapp/bamboo-molecules';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useFieldType, useField, useCellValue } from '../../contexts';
import { useContextMenu } from '../../hooks';
import { ViewRenderer, EditRenderer } from '../FieldRenderers';
import { DragAndExtendHandle } from '../DragAndExtendHandle';
import {
    CELL_FOCUS_PLUGIN_KEY,
    useCellFocusMethods,
    useCellSelectionMethods,
    usePluginsDataStoreRef,
} from '../../plugins';
import { CellSelectionIndicator } from '../CellSelectionIndicator';
import '../CellBorder';
import type { Field } from '../../types';
import { shallowCompare } from '../../../utils';

export type Props<T = any> = RenderCellProps &
    Omit<PressableProps, 'ref'> &
    WithElements<
        (args: {
            field: Field;
            focused: boolean;
            value: T;
            setValue: (newValue: T) => void;
            pressedKey?: string;
        }) => ReactNode
    > & {
        innerContainerProps?: Partial<ViewProps>;
        readonly?: boolean;
    };

const emptyObj = {};

const _DataCell = (
    {
        innerContainerProps = emptyObj,
        style,
        readonly: cellReadonly = false,
        left,
        right,
        ...rest
    }: Props,
    ref: any,
) => {
    const { View, CellBorder, Pressable } = useMolecules();
    const cellRef = useRef<any>(null);

    const { hovered = false } = useActionState({ ref: cellRef });

    const { row, column, rowIndex, columnIndex } = useDataTableCell();

    const field = useField(column);
    const { type, ...restField } = field;
    const { readonly, displayEditorOnHover, showEditor } = useFieldType(type);

    const { useOnSelectCell, useOnDragAndSelectStart, useOnDragAndSelectEnd } =
        useCellSelectionMethods();
    const { useSetFocusCellPluginStore, useIsCellFocused, usePressedKeyRef } =
        useCellFocusMethods();

    const { isFocused, isEditing } = useIsCellFocused(row, column);
    const onSelectCell = useOnSelectCell();
    const onDragAndSelectStart = useOnDragAndSelectStart();
    const onDragAndSelectEnd = useOnDragAndSelectEnd();

    const pluginDataStore = usePluginsDataStoreRef().store;
    const setFocusCellPluginStore = useSetFocusCellPluginStore();
    const pressedKey = usePressedKeyRef();

    const isTappedRef = useRef(0);
    const isEditingRef = useLatest(isEditing);

    const [value, setValue] = useCellValue(row, column);

    const onFocus = useCallback(
        (e: GestureResponderEvent) => {
            const cell = { columnIndex, rowIndex, columnId: column, rowId: row, type: 'cell' };

            if ((e as unknown as MouseEvent).shiftKey) {
                onSelectCell({ columnIndex, rowIndex });
                return;
            }

            if (shallowCompare(cell, pluginDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell))
                return;

            setFocusCellPluginStore(() => ({
                focusedCell: cell,
                isEditing: false,
            }));
        },
        [
            column,
            columnIndex,
            onSelectCell,
            row,
            rowIndex,
            setFocusCellPluginStore,
            pluginDataStore,
        ],
    );

    const onPress = useCallback(
        (e: GestureResponderEvent) => {
            if (isEditingRef.current) return;

            const delta = new Date().getTime() - isTappedRef.current;

            if (delta < 500) {
                if (cellReadonly || readonly || displayEditorOnHover) return;

                setFocusCellPluginStore((prev: { isEditing?: boolean } | undefined) => ({
                    isEditing: !prev?.isEditing,
                }));

                return;
            }

            isTappedRef.current = new Date().getTime();

            onFocus(e);
        },
        [
            cellReadonly,
            displayEditorOnHover,
            isEditingRef,
            onFocus,
            readonly,
            setFocusCellPluginStore,
        ],
    );

    const displayViewRenderer = useMemo(() => {
        if (readonly || cellReadonly) return true;

        return showEditor
            ? !showEditor({ hovered, focused: isFocused, doubleTapped: isEditing })
            : !isEditing;
    }, [cellReadonly, hovered, isEditing, isFocused, readonly, showEditor]);

    const { containerStyle, innerContainerStyle, dataSet } = useMemo(
        () => ({
            containerStyle: [
                styles.cellContainer,
                actionContainerProps.style,
                !isEditing ? styles.centered : styles.editContainer,
                style,
            ] as ViewStyle,
            innerContainerStyle: [styles.cell, innerContainerProps.style] as ViewStyle,
            dataSet: { elementtype: 'cell' },
        }),
        [style, isEditing, innerContainerProps.style],
    );

    const onDrag = useMemo(() => {
        return Gesture.Pan()
            .onBegin(() => {
                onFocus({} as GestureResponderEvent);
                onDragAndSelectStart({
                    rowIndex,
                    columnIndex,
                });
            })
            .onEnd(() => {
                onDragAndSelectEnd();
            });
    }, [onFocus, onDragAndSelectStart, rowIndex, columnIndex, onDragAndSelectEnd]);

    const handleContextMenu = useCallback(() => {
        onFocus({} as GestureResponderEvent);
        setFocusCellPluginStore(() => ({
            focusedCellRef: cellRef,
        }));
    }, [onFocus, setFocusCellPluginStore]);

    const leftElement = useMemo(
        () => (
            <>
                {left ? (
                    <>
                        {typeof left === 'function'
                            ? left?.({
                                  field,
                                  value,
                                  setValue,
                                  focused: isFocused,
                                  pressedKey,
                              })
                            : left}
                    </>
                ) : null}
            </>
        ),
        [field, isFocused, left, pressedKey, setValue, value],
    );

    const rightElement = useMemo(
        () => (
            <>
                {right ? (
                    <>
                        {typeof right === 'function'
                            ? right?.({
                                  field,
                                  value,
                                  setValue,
                                  focused: isFocused,
                                  pressedKey,
                              })
                            : right}
                    </>
                ) : null}
            </>
        ),
        [field, isFocused, pressedKey, right, setValue, value],
    );

    useEffect(() => {
        if (isFocused || !isEditing) return;

        setFocusCellPluginStore(() => ({ isEditing: false }));
    }, [isEditing, isFocused, setFocusCellPluginStore]);

    useContextMenu({ ref: cellRef, callback: handleContextMenu });

    return (
        <Pressable
            ref={cellRef}
            onPress={onPress}
            style={containerStyle}
            // @ts-ignore
            dataSet={dataSet}
            // onKeyDown={onKeyDown}
            {...rest}>
            <GestureDetector gesture={onDrag}>
                <View ref={ref} style={innerContainerStyle} {...innerContainerProps}>
                    {leftElement}
                    {displayViewRenderer ? (
                        <ViewRenderer value={value} type={type} {...restField} />
                    ) : (
                        <EditRenderer
                            value={value}
                            type={type}
                            onChange={setValue}
                            pressedKey={pressedKey}
                            {...restField}
                        />
                    )}
                    {rightElement}
                </View>
            </GestureDetector>

            <CellBorder isFocused={isFocused} columnIndex={columnIndex} rowIndex={rowIndex} />

            <CellSelectionIndicator hovered={hovered} />

            {!isEditing && <DragAndExtendHandle style={styles.dragHandle} isFocused={isFocused} />}
        </Pressable>
    );
};

const DataCell = forwardRef(_DataCell);

const actionContainerProps = { style: { height: '100%', outline: 'none' } };

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        padding: 4,
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
    },
    editContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        minHeight: '100%',
        width: '100%',
    },
    centered: {
        justifyContent: 'center',
    },
    dragHandle: {
        position: 'absolute',
        bottom: -3,
        right: -3,
    },
});

export default memo(DataCell);
