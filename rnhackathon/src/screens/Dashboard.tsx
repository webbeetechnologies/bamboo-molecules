import React from 'react';
import { useSelector } from 'react-redux';

import type { MachinesType, RootState } from '../store/types';

import { Container } from '../components/Container';
import { MachineType } from '../../src/components/MachineType';
import { useMolecules } from '../../App';

const viewStyle = {
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    flex:1
};

const Dashboard = () => {
    const { machine_types } = useSelector((state: RootState) => state.machinesReducer);
    const { View } = useMolecules();
    return (
        <Container>
            <View style={viewStyle}>
                {machine_types.map((machine_type: MachinesType) => (
                    <MachineType machine_type={machine_type} key={machine_type.id} />
                ))}
            </View>
        </Container>
    );
};

export default Dashboard;
