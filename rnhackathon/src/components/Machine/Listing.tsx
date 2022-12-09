import { useMolecules } from '../../../App';
import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
    ActionTypes,
    FieldTypes,
    MachineTypesFields,
    MachineTypesFieldsValue,
} from '../../store/types';
import { CheckBoxField, DateField, InputField } from '../FieldBox';

import type { getFieldValueType } from '../MachineType/Listing';

type Props = {
    machine_types_fields: MachineTypesFields[];
    machine_id: string;
    getFieldValue: getFieldValueType;
};

const Listing = (props: Props) => {
    const { machine_types_fields, machine_id, getFieldValue } = props;

    return (
        <>
            {machine_types_fields.map((item, index) => (
                <Item
                    machine_type_field={item}
                    key={'machine_type_field-' + index}
                    field={getFieldValue(machine_id, item.id)}
                    machine_id={machine_id}
                />
            ))}
        </>
    );
};

export default memo(Listing);

type ItemProps = {
    machine_type_field: MachineTypesFields;

    machine_id: string;
    field: MachineTypesFieldsValue | undefined;
};

const Item = memo(({ machine_type_field, field, machine_id }: ItemProps) => {
    const {View} = useMolecules();
    const dispatch = useDispatch();

    const onChange = useCallback(
        (text: string) => {
           
            if (field) {
                dispatch({
                    type: ActionTypes.UPDATE_MACHINE_TYPES_FIELD_VALUE,
                    payload: {
                        id: field.id,
                        value: text,
                    },
                });
            } else {
                dispatch({
                    type: ActionTypes.ADD_MACHINE_TYPES_FIELD_VALUE,
                    payload: {
                        value: text,
                        machine_type_field_id: machine_type_field.id,
                        machine_id: machine_id,
                    },
                });
            }
        },
        [field],
    );

    const renderFieldType = React.useMemo(() => {
        const restProps = {
            name: machine_type_field.name,
            value: field?.value,
        };

        switch (machine_type_field.type) {
            case FieldTypes.CHECKBOX:
                return <CheckBoxField onChange={onChange} {...restProps} />;

            case FieldTypes.DATE:
                return <DateField onChange={onChange} {...restProps} />;

            case FieldTypes.NUMBER:
                return <InputField type="number-pad" onChange={onChange} {...restProps} />;
            case FieldTypes.TEXT:
                return <InputField onChange={onChange} {...restProps} />;

            default:
                return <View />;
        }
    }, [machine_type_field.type, field]);

    return <View>{renderFieldType}</View>;
});
