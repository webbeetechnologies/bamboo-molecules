import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActionTypes, MachinesType, MachineTypesFields, RootState } from '../store/types';
import { EditMachineType } from '../components/EditMachineType';
import Container from '../components/Container/Container';
import { useMolecules } from '../../App';

const viewStyle = {
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    flex: 1,
};

const ManageCategories = () => {
    const { machine_types, machine_types_fields } = useSelector(
        (state: RootState) => state.machinesReducer,
    );
    const { View } = useMolecules();

    return (
        <Container>
            <View style={viewStyle}>
                {machine_types.map((machine_type: MachinesType) => {
                    const filtered_machine_types_fields = machine_types_fields.filter(
                        (e: MachineTypesFields) => e.machine_type_id === machine_type.id,
                    );

                    return (
                        <EditMachineType
                            key={machine_type.id}
                            machine_type={machine_type}
                            filtered_machine_types_fields={filtered_machine_types_fields}
                        />
                    );
                })}
            </View>
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
    margin: 'spacings.3',
};
