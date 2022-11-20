import { memo, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useMolecules } from 'bamboo-molecules';
import { useRoute } from '@react-navigation/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { withDashboardLayout } from '../../hocs';
import { MachineCard } from '../../components';
import { createMachine } from '../../features';
import { normalizeMachines } from '../../utils';

const DashboardScreen = () => {
    const { View, Button, DropdownList, ListItem, SectionList, H2, HorizontalDivider } =
        useMolecules();
    const { machines, machineTypes } = useAppSelector(({ machinesState }) => ({
        machines: machinesState.machines,
        machineTypes: machinesState.machineTypes,
    }));
    const dispatch = useAppDispatch();
    const route = useRoute();

    const normalizedMachines = useMemo(
        () => normalizeMachines(machines, machineTypes, (route?.params as any)?.id),
        [machineTypes, machines, route?.params],
    );

    const onMenuItemClick = (id: string) => {
        dispatch(createMachine({ machineTypeId: id }));
    };

    return (
        <ScrollView style={styles.container}>
            <SectionList
                style={styles.listContainer}
                sections={normalizedMachines}
                renderItem={({ item }) => <MachineCard machine={item} />}
                renderSectionHeader={({ section }) => <H2>{section.name}s</H2>}
                renderSectionFooter={() => <HorizontalDivider spacing={10} />}
            />

            <View style={styles.btnContainer}>
                <DropdownList
                    containerStyle={styles.popoverContainer}
                    trigger={props => (
                        <Button {...props} variant="contained-tonal" iconName="chevron-down">
                            Add Machine
                        </Button>
                    )}
                    records={[{ data: machineTypes }]}
                    renderItem={({ item }) => (
                        <ListItem onPress={() => onMenuItemClick(item.id)}>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    listContainer: {
        minHeight: 500,
    },
    btnContainer: {
        marginTop: 10,
    },
    popoverContainer: { minWidth: 150, backgroundColor: '#fff' },
});

export default memo(withDashboardLayout(DashboardScreen));
