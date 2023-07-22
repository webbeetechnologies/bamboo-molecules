import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import {
    CallbackActionState,
    RenderCellProps,
    useMolecules,
    withActionState,
} from '@bambooapp/bamboo-molecules';

import { useFieldType, useTableManagerStoreRef, useFocusedCell, useHooks } from '../../contexts';
import { useContextMenu } from '../../hooks';
import { ViewRenderer, EditRenderer } from '../FieldRenderers';

export type Props = RenderCellProps & CallbackActionState & ViewProps & {};

const CellRenderer = ({ hovered, column, row, columnIndex }: Props, ref: any) => {
    const { View, StateLayer } = useMolecules();

    const cellRef = useRef<any>(null);

    const { useField, useCellValue } = useHooks();
    const { type, ...restField } = useField(column);
    const { readonly, displayEditorOnHover } = useFieldType(type);
    const [isFocused, setFocusedCell] = useFocusedCell(row, column);
    const { set: setTableManagerStore } = useTableManagerStoreRef();
    // const [{ width = 140 }] = useFieldConfigs(column);

    const isTappedRef = useRef(0);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useCellValue(row, column);

    const onFocus = useCallback(() => {
        setFocusedCell({ columnId: column, rowId: row, type: 'cell' });
    }, [column, row, setFocusedCell]);

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

        return !displayEditorOnHover ? !isEditing : !hovered && !isFocused;
    }, [displayEditorOnHover, hovered, isEditing, isFocused, readonly]);

    const { containerStyle, stateLayerStyle } = useMemo(
        () => ({
            containerStyle: [
                styles.cell,
                !isEditing ? styles.centered : styles.editContainer,
                columnIndex === 0 && {
                    borderLeftWidth: 1,
                },
            ],
            stateLayerStyle: [StyleSheet.absoluteFillObject, isFocused && styles.focused],
        }),
        [isEditing, columnIndex, isFocused],
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
        <Pressable ref={cellRef} onPress={onPress} style={styles.cellContainer}>
            <View ref={ref} style={containerStyle}>
                {displayViewRenderer ? (
                    <ViewRenderer value={value} type={type} {...restField} />
                ) : (
                    <EditRenderer value={value} type={type} onChange={setValue} {...restField} />
                )}

                <StateLayer style={stateLayerStyle} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cellContainer: {
        height: 40,
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

export default memo(withActionState(forwardRef(CellRenderer)));
