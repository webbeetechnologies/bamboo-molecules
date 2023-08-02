import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { CallbackActionState, withActionState } from '../../../hocs';
import { useMolecules } from '../../../hooks';
import type { RenderCellProps, StateLayerProps } from '../../../components';

import {
    useFieldType,
    useTableManagerStoreRef,
    useIsCellFocused,
    useField,
    useCellValue,
} from '../../contexts';
import { useContextMenu } from '../../hooks';
import { ViewRenderer, EditRenderer } from '../FieldRenderers';
import { useDataTableCell } from '../../../components';

export type Props = RenderCellProps &
    CallbackActionState &
    Omit<PressableProps, 'ref'> & {
        innerContainerProps?: Partial<ViewProps>;
        stateLayerProps?: Partial<StateLayerProps>;
    };

const emptyObj = {};

const DataCell = (
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

    const { column, row, rowIndex, columnIndex } = useDataTableCell();

    const { type, ...restField } = useField(column);
    const { readonly, displayEditorOnHover, showEditor } = useFieldType(type);
    const [isFocused, setFocusedCell] = useIsCellFocused(row, column);
    const { set: setTableManagerStore } = useTableManagerStoreRef();

    const isTappedRef = useRef(0);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useCellValue(row, column);

    const onFocus = useCallback(() => {
        setFocusedCell({ columnId: column, rowId: row, columnIndex, rowIndex, type: 'cell' });
    }, [column, columnIndex, row, rowIndex, setFocusedCell]);

    const onPress = useCallback(() => {
        const delta = new Date().getTime() - isTappedRef.current;

        if (delta < 200) {
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
            </View>
        </Pressable>
    );
};

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
});

export default memo(withActionState(forwardRef(DataCell)));
