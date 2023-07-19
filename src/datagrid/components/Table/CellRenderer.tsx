import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

const CellRenderer = ({ hovered, column, row, columnIndex }: Props) => {
    const { View } = useMolecules();

    const { type, returnField, ...restField } = useField(column);
    const { readonly, displayEditorOnHover } = useFieldType(type);
    const [isFocused, setFocusedCell] = useFocusedCell(row, column);
    // const [{ width = 140 }] = useFieldConfigs(column);

    const isTappedRef = useRef(false);

    const [isEditing, setIsEditing] = useState(false);

    const [value, setValue] = useCellValue(row, column);

    const onPress = useCallback(() => {
        if (isTappedRef.current) {
            if (readonly || displayEditorOnHover) return;

            setIsEditing(prev => !prev);

            return;
        }

        setFocusedCell({ fieldId: column, recordId: row });
    }, [column, displayEditorOnHover, readonly, row, setFocusedCell]);

    const displayViewRenderer = useMemo(() => {
        if (readonly) return true;

        return !displayEditorOnHover ? !isEditing : !hovered;
    }, [displayEditorOnHover, hovered, isEditing, readonly]);

    const { containerStyle } = useMemo(
        () => ({
            containerStyle: [
                styles.cell,
                !isEditing && styles.centered,
                columnIndex === 0 && {
                    borderLeftWidth: 1,
                },
                isFocused && styles.focused,
            ],
        }),
        [isEditing, columnIndex, isFocused],
    );

    useEffect(() => {
        if (!isFocused) return;

        isTappedRef.current = true;

        const timeout = setTimeout(() => {
            isTappedRef.current = false;
        }, 250);

        return () => clearTimeout(timeout);
    }, [isFocused]);

    useEffect(() => {
        if (isFocused || !isEditing) return;

        setIsEditing(false);
    }, [isEditing, isFocused]);

    return (
        <Pressable onPress={onPress}>
            <View style={containerStyle} collapsable={false}>
                {displayViewRenderer ? (
                    <ViewRenderer
                        value={value}
                        type={type}
                        returnFieldType={returnField.type}
                        {...restField}
                    />
                ) : (
                    <EditRenderer
                        value={value}
                        type={type}
                        returnFieldType={returnField.type}
                        onChange={setValue}
                        {...restField}
                    />
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cell: {
        height: 40,
        padding: 4,
        borderRightWidth: 1,
        borderColor: 'rgb(202, 196, 208)',
    },
    focused: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderWidth: 2,
        borderColor: 'blue',
    },
    centered: {
        justifyContent: 'center',
    },
});

export default memo(withActionState(CellRenderer));
