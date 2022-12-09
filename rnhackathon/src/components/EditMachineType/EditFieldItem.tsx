import React, { memo, useCallback } from 'react';

import { ActionTypes, FieldTypes, MachineTypesFields } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useMolecules } from '../../../App';
import { SelectDropdown } from '../SelectDropdown';

interface Props {
    machine_type_field: MachineTypesFields;
}
//TODO: BUG
const containerStyle = {
    flexDirection: 'row' as 'row',
    marginBottom: 'spacings.4',
};

const dropdownStyle = {
    buttonStyle: {
        borderRadius: 0,
        borderBottomWidth: 1,
        borderColor: 'colors.primary',
        marginLeft: 'spacings.2',
    },
    textStyle: {
        fontSize: 14,
    },
};

const textInputStyle = { flex: 1, marginTop: -5 };

const fieldNames = [
    {
        text: FieldTypes.NUMBER,
    },
    {
        text: FieldTypes.TEXT,
    },
    {
        text: FieldTypes.CHECKBOX,
    },
    {
        text: FieldTypes.DATE,
    },
];

const EditFieldItem = ({ machine_type_field }: Props) => {
    const { TextInput, IconButton, View } = useMolecules();
    const dispatch = useDispatch();

    const onChange = useCallback(
        (value: string, property: string) => {
            dispatch({
                type: ActionTypes.UPDATE_MACHINE_TYPES_FIELD,
                payload: {
                    id: machine_type_field?.id,
                    property: property,
                    value: value,
                },
            });
        },
        [machine_type_field.id],
    );

    const onChangeFieldLabel = useCallback(
        (text: string) => {
            onChange(text, 'name');
        },
        [onChange],
    );

    const onChangeFieldType = useCallback(
        (item:{text:string}) => {
            onChange(item.text, 'type');
        },
        [onChange],
    );

    const onDelete = useCallback(() => {
        dispatch({
            type: ActionTypes.DELETE_MACHINE_TYPES_FIELD,
            payload: {
                id: machine_type_field.id,
            },
        });
    }, [machine_type_field.id]);

    return (
        <View style={containerStyle}>
            <TextInput
                variant="outlined"
                label="Field"
                value={machine_type_field.name}
                onChangeText={onChangeFieldLabel}
                containerStyle={textInputStyle}
            />
            <SelectDropdown
                style={dropdownStyle.buttonStyle}
                data={fieldNames}
                label={machine_type_field.type}
                onChange={onChangeFieldType}
            />

            <IconButton name="trash-can-outline" size="lg" onPress={onDelete} />
        </View>
    );
};

export default memo(EditFieldItem);
