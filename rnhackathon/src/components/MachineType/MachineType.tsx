import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { Machines, MachinesType, MachineTypesFields, RootState } from '../../store/types';
import Header from './Header';
import Listing from './Listing';
import { useMolecules } from '../../../App';

interface Props {
    machine_type: MachinesType;
}
const containerStyle = {
    marginBottom: 'spacings.5',
    padding: 'spacings.3',
    minWidth: 320,
    maxWidth:600,
    flexGrow: 1,
};

const MachineType = ({ machine_type }: Props) => {
    const { View } = useMolecules();

    const { machines, machine_types_fields, machine_types_fields_value } = useSelector(
        (state: RootState) => state.machinesReducer,
    );

    const filteredMachines = useMemo(
        () => machines.filter((e: Machines) => e.machine_type_id === machine_type.id),
        [machines, machine_type.id],
    );

    const filteredMachinesTypesFields = useMemo(
        () =>
            machine_types_fields.filter(
                (e: MachineTypesFields) => e.machine_type_id === machine_type.id,
            ),
        [machine_types_fields, machine_type.id],
    );

    return (
        <View style={containerStyle}>
            <Header machine_type={machine_type} />

            <Listing
                title_id={machine_type.title_id}
                machines={filteredMachines}
                machine_types_fields={filteredMachinesTypesFields}
                machine_types_fields_value={machine_types_fields_value}
            />
        </View>
    );
};

export default memo(MachineType);
