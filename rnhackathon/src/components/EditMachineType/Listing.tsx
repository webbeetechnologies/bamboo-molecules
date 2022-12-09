import React, { memo, useCallback } from 'react';

import { ActionTypes, MachinesType, MachineTypesFields } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useMolecules } from '../../../App';
import EditFieldItem from './EditFieldItem';

interface Props {
    machine_type: MachinesType;
    filtered_machine_types_fields: MachineTypesFields[];
}

const Listing = ({ filtered_machine_types_fields, machine_type }: Props) => {
    const { View, TextInput } = useMolecules();
    const dispatch = useDispatch();

    const onChangeCategoryName = useCallback(
        (text: string) => {
            dispatch({
                type: ActionTypes.UPDATE_MACHINE_TYPE,
                payload: {
                    id: machine_type.id,
                    property: 'name',
                    value: text,
                },
            });
        },
        [machine_type.id],
    );

    return (
        <>
            <View style={{ marginBottom: 'spacings.4' }}>
                <TextInput
                    variant="outlined"
                    label="Category Name"
                    value={machine_type.name}
                    onChangeText={onChangeCategoryName}
                />
            </View>
            {filtered_machine_types_fields.map((fmtf: MachineTypesFields) => {
                return <EditFieldItem machine_type_field={fmtf} key={fmtf.id} />;
            })}
        </>
    );
};

export default memo(Listing);
