import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import {
    RenderCellProps,
    StateLayerProps,
    useMolecules,
    CallbackActionState,
    withActionState,
    useDataTableCell,
} from '@bambooapp/bamboo-molecules';

import { useFieldType, useTableManagerStoreRef, useIsCellFocused, useHooks } from '../../contexts';
import { useContextMenu } from '../../hooks';
import { ViewRenderer, EditRenderer } from '../FieldRenderers';
import { DragAndExtendHandle } from '../DragAndExtendHandle';

export type Props = RenderCellProps &
    CallbackActionState &
    Omit<PressableProps, 'ref'> & {
        innerContainerProps?: Partial<ViewProps>;
        stateLayerProps?: Partial<StateLayerProps>;
    };

const emptyObj = {};

const _CellRenderer = (
    {
        hovered = false,
        innerContainerProps = emptyObj,
        stateLayerProps = emptyObj,
        style,
        ...rest
    }: Props,
    ref: any,
) => {
    const { View, StateLayer } = useMolecules();

    const cellRef = useRef<any>(null);
    // const { hovered: rowHovered } = useDataTableRow();
    // const [selection] = useSelection();

    const { column, row, rowIndex, columnIndex } = useDataTableCell();

    const { useField, useCellValue } = useHooks();
    const { type, ...restField } = useField(column);
    const { readonly, displayEditorOnHover, showEditor } = useFieldType(type);
    const [isFocused, setFocusedCell] = useIsCellFocused(row, column);
    const { set: setTableManagerStore } = useTableManagerStoreRef();

    const isTappedRef = useRef(0);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useCellValue(row, column);

    const onFocus = useCallback(() => {
        setFocusedCell({
            columnId: column,
            rowId: row,
            columnIndex,
            rowIndex,
            type: 'cell',
        });
    }, [column, columnIndex, row, rowIndex, setFocusedCell]);

    const onPress = useCallback(() => {
        const delta = new Date().getTime() - isTappedRef.current;

        if (delta < 500) {
            if (readonly || displayEditorOnHover) return;

            setIsEditing(prev => !prev);

            return;
        }

        isTappedRef.current = new Date().getTime();

        onFocus();
    }, [displayEditorOnHover, onFocus, readonly]);

    const displayViewRenderer = useMemo(() => {
        if (readonly) return true;

        return showEditor
            ? !showEditor({ hovered, focused: isFocused, doubleTapped: isEditing })
            : !isEditing;
    }, [hovered, isEditing, isFocused, readonly, showEditor]);

    const { containerStyle, innerContainerStyle, stateLayerStyle } = useMemo(
        () => ({
            containerStyle: [styles.cellContainer, style] as ViewStyle,
            innerContainerStyle: [
                styles.cell,
                !isEditing ? styles.centered : styles.editContainer,
                columnIndex === 0 && {
                    borderLeftWidth: 1,
                },
                innerContainerProps.style,
            ] as ViewStyle,
            stateLayerStyle: [
                StyleSheet.absoluteFillObject,
                isFocused && styles.focused,
                stateLayerProps.style,
                // rowHovered &&
                //     selection.currentCell &&
                //     !isFocused &&
                //     (selection.currentCell?.row === row ||
                //         selection.currentCell?.column === column) &&
                //     styles.selected,
            ],
        }),
        [
            style,
            isEditing,
            columnIndex,
            innerContainerProps.style,
            isFocused,
            stateLayerProps.style,
        ],
    );

    useEffect(() => {
        if (isFocused || !isEditing) return;

        setIsEditing(false);
    }, [isEditing, isFocused]);

    const handleContextMenu = useCallback(() => {
        onFocus();
        setTableManagerStore(() => ({
            focusedCellRef: cellRef,
        }));
    }, [onFocus, setTableManagerStore]);

    useContextMenu({ ref: cellRef, callback: handleContextMenu });

    return (
        <Pressable ref={cellRef} onPress={onPress} style={containerStyle} {...rest}>
            <View ref={ref} style={innerContainerStyle} {...innerContainerProps}>
                {displayViewRenderer ? (
                    <ViewRenderer value={value} type={type} {...restField} />
                ) : (
                    <EditRenderer value={value} type={type} onChange={setValue} {...restField} />
                )}
                <StateLayer {...stateLayerProps} style={stateLayerStyle} />

                {isFocused && <DragAndExtendHandle style={styles.dragHandle} />}
            </View>
        </Pressable>
    );
};

const CellRenderer = withActionState(forwardRef(_CellRenderer));

const CellRendererWithStyledHeight = forwardRef((props: Props, ref: any) => (
    <CellRenderer {...props} ref={ref} actionStateContainerProps={{ style: { height: '100%' } }} />
));

const styles = StyleSheet.create({
    cellContainer: {
        height: '100%',
    },
    cell: {
        flex: 1,
        padding: 4,
        borderRightWidth: 1,
        borderColor: 'rgb(202, 196, 208)',
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
    selected: {
        backgroundColor: 'red',
    },
});

export default memo(CellRendererWithStyledHeight);
