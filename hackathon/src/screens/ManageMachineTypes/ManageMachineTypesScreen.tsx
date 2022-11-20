import { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useMolecules } from 'bamboo-molecules';

import { withDashboardLayout } from '../../hocs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MachineTypeCard } from '../../components';
import { createMachineType } from '../../features';

const ManageMachineTypesScreen = () => {
    const { Button } = useMolecules();
    const { machineTypes } = useAppSelector(({ machinesState }) => ({
        machineTypes: machinesState.machineTypes,
    }));
    const dispatch = useAppDispatch();

    const onCreateMachineType = () => {
        dispatch(createMachineType());
    };

    return (
        <ScrollView style={styles.container}>
            {machineTypes.map(item => (
                <MachineTypeCard key={item.id} machineType={item} />
            ))}

            <Button style={styles.btn} variant="contained" onPress={onCreateMachineType}>
                Add Machine Type
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    btn: {
        marginTop: 10,
    },
});

export default memo(withDashboardLayout(ManageMachineTypesScreen));
