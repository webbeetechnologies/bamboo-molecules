import React, { memo, useCallback, useMemo } from 'react';

import { ActionTypes, MachinesType, MachineTypesFields } from '../../store/types';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Listing from './Listing';
import { useMolecules } from '../../../App';
import SelectTitleDropdown from './SelectTitleDropdown';

interface Props {
    machine_type: MachinesType;

    filtered_machine_types_fields: MachineTypesFields[];
}

const containerStyle = {
    backgroundColor: 'colors.bg700',

    marginVertical: 'spacings.2',
    borderRadius: 5,
    margin: 'spacings.3',
    marginBottom: 'spacings.5',
    padding: 'spacings.3',
    minWidth: 320,
    flexGrow: 1,
};

const EditMachineType = ({
    machine_type,

    filtered_machine_types_fields,
}: Props) => {
    const { View } = useMolecules();

    const getTitle = useMemo(() => {
        const field = filtered_machine_types_fields.find(
            (val: MachineTypesFields) => val.id === machine_type.title_id,
        );

        if (field) {
            return 'TITLE FIELD: ' + field.name;
        }
        return 'TITLE FIELD: UNNAMED';
    }, [machine_type.title_id, filtered_machine_types_fields]);

    return (
        <View style={containerStyle}>
            <Header machine_type={machine_type} />
            <Listing
                filtered_machine_types_fields={filtered_machine_types_fields}
                machine_type={machine_type}
            />
            <SelectTitleDropdown
                filtered_machine_types_fields={filtered_machine_types_fields}
                getTitle={getTitle}
                machine_type_id={machine_type.id}
            />

            <AddFieldBtn machine_type_id={machine_type.id} />
        </View>
    );
};

export default memo(EditMachineType);

interface AddFieldBtnProps {
    machine_type_id: string;
}

const AddFieldBtn = memo(({ machine_type_id }: AddFieldBtnProps) => {
    const { Button } = useMolecules();
    const dispatch = useDispatch();

    const onAdd = useCallback(() => {
        dispatch({
            type: ActionTypes.ADD_MACHINE_TYPES_FIELD,
            payload: {
                name: '',
                machine_type_id: machine_type_id,
            },
        });
    }, [machine_type_id]);

    return (
        <Button  iconName="plus" variant="text" onPress={onAdd}>
            ADD NEW FIELD
        </Button>
    );
});

