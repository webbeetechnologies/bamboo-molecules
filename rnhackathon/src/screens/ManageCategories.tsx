import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '../styles';

import { ActionTypes, MachinesType, MachineTypesFields, RootState } from '../store/types';
import MachineType from '../components/EditMachineType/EditMachineType';
import Container from '../components/Container/Container';
import { useMolecules } from '../../App';

const ManageCategories = () => {
    const { machine_types, machine_types_fields } = useSelector(
        (state: RootState) => state.machinesReducer,
    );

    return (
        <Container>
            {machine_types.map((machine_type: MachinesType) => {
                const filtered_machine_types_fields = machine_types_fields.filter(
                    (e: MachineTypesFields) => e.machine_type_id === machine_type.id,
                );

                return (
                    <MachineType
                        key={machine_type.id}
                        machine_type={machine_type}
                        filtered_machine_types_fields={filtered_machine_types_fields}
                    />
                );
            })}

            <AddNewCategoryBtn />
        </Container>
    );
};

export default ManageCategories;

const AddNewCategoryBtn = memo(() => {
    const { Button } = useMolecules();
    const dispatch = useDispatch();

    const onAddNew = React.useCallback(() => {
        dispatch({
            type: ActionTypes.ADD_MACHINE_TYPE,
            payload: {},
        });
    }, []);

    return (
        <Button variant="contained" style={btnStyle} onPress={onAddNew}>
            ADD NEW CATEGORY
        </Button>
    );
});

const btnStyle = {
    marginTop: 'spacings.2',
};
