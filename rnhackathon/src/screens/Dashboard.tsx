import React from 'react';
import {useSelector} from 'react-redux';

import type {MachinesType,RootState} from '../store/types';

import {Container} from '../components/Container';
import { MachineType } from '../../src/components/MachineType';


const Dashboard = () => {
  const {machine_types} = useSelector(
    (state: RootState) => state.machinesReducer,
  );

  return (
    <Container>
      {machine_types.map((machine_type: MachinesType) => (
        <MachineType machine_type={machine_type} key={machine_type.id} />
      ))}
    </Container>
  );
};

export default Dashboard;
