import React, { memo, useMemo } from 'react';
import { colors } from '../../styles';
import { View } from 'react-native';

import type { Machines, MachineTypesFields, MachineTypesFieldsValue } from '../../store/types';
import type { getFieldValueType } from '../MachineType/Listing';
import Listing from './Listing';
import Header from './Header';

type Props = {
    machine: Machines;

    title_id: string;
    machine_types_fields: MachineTypesFields[];
    machine_types_fields_value: MachineTypesFieldsValue[];
    getFieldValue: getFieldValueType;
}

const style = {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
};

const Machine = ({
    machine,
    title_id,
    machine_types_fields,
    machine_types_fields_value,
    getFieldValue,
}: Props) => {
    const getTitle = useMemo(() => {
        const field = machine_types_fields.find((mtf: MachineTypesFields) => mtf.id === title_id);

        if (field) {
            const fieldValue = machine_types_fields_value.find(
                (mtfv: MachineTypesFieldsValue) =>
                    mtfv.machine_type_field_id === field.id && mtfv.machine_id === machine.id,
            );
            if (fieldValue) {
                return fieldValue.value;
            }
        }
        return 'NO TITLE';
    }, [machine_types_fields_value, machine_types_fields, title_id]);

    return (
        <View style={style}>
            <Header title={getTitle} machine_id={machine.id} />

            <Listing
                machine_types_fields={machine_types_fields}
                machine_id={machine.id}
                getFieldValue={getFieldValue}
            />
        </View>
    );
};

export default memo(Machine);
