import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import {
    CallbackActionState,
    RenderCellProps,
    useMolecules,
    withActionState,
} from '@bambooapp/bamboo-molecules';

import { useCellValue, useField, useFieldType } from '../../contexts';
import { ViewRenderer, EditRenderer } from '../FieldRenderers';
import { useFocusedCell } from '../../contexts/RecordsContext';
// import { withVirtualization } from '../../hocs';
// import { ADD_FIELD_COL_ID, SELECTION_COL_ID } from './utils';
// import RowSelectionItem from './RowSelectionItem';

export type Props = RenderCellProps & CallbackActionState & {};
//
// const withCorrectRenderer = <T,>(Component: ComponentType<T>) => {
//     return (props: T) => {
//         switch (props.column) {
//             case SELECTION_COL_ID:
//                 return <RowSelectionItem {...props} index={props.rowIndex} />;
//
//             case ADD_FIELD_COL_ID:
//                 return null;
//             default:
//                 return <Component {...props} />;
//         }
//     };
// };

const CellRenderer = ({ hovered, column, row, columnIndex }: Props, ref: any) => {
    const { View, StateLayer } = useMolecules();

    const { type, ...restField } = useField(column);
    const { readonly, displayEditorOnHover } = useFieldType(type);
    const [isFocused, setFocusedCell] = useFocusedCell(row, column);
    // const [{ width = 140 }] = useFieldConfigs(column);

    const isTappedRef = useRef(0);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useCellValue(row, column);

    const onPress = useCallback(() => {
        const delta = new Date().getTime() - isTappedRef.current;

        if (delta < 200) {
            if (readonly || displayEditorOnHover) return;

            setIsEditing(prev => !prev);

            return;
        }

        isTappedRef.current = new Date().getTime();

        setFocusedCell({ fieldId: column, recordId: row });
    }, [column, displayEditorOnHover, readonly, row, setFocusedCell]);

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

    // useEffect(() => {
    //     console.log(`CellRenderer${column}-${row} - mounted`);
    //
    //     return () => {
    //         console.log(`CellRenderer${column}-${row} - unmounted`);
    //     };
    // }, [column, row]);

    return (
        <Pressable onPress={onPress} style={styles.cellContainer}>
            <View ref={ref} style={containerStyle} collapsable={false}>
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
