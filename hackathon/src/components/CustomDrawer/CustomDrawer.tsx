import { memo } from 'react';
import { StyleSheet, ViewStyle, SafeAreaView, useWindowDimensions } from 'react-native';
import { useMolecules } from 'bamboo-molecules';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

import { ROUTE_KEYS } from '../../navigator/utils';
import { useAppSelector } from '../../hooks';

type Props = DrawerContentComponentProps & ViewStyle & {};

const CustomDrawer = ({ navigation }: Props) => {
    const { Button, HorizontalDivider, FlatList, View } = useMolecules();
    const { machineTypes } = useAppSelector(({ machinesState }) => ({
        machineTypes: machinesState.machineTypes,
    }));
    const dimensions = useWindowDimensions();

    return (
        <SafeAreaView style={styles.container}>
            <Button style={styles.button} onPress={() => navigation.navigate(ROUTE_KEYS.DASHBOARD)}>
                Dashboard
            </Button>
            <Button
                style={styles.button}
                onPress={() => navigation.navigate(ROUTE_KEYS.MANAGE_MACHINE_TYPES)}>
                Manage Machine Types
            </Button>
            <HorizontalDivider spacing={10} />

            <View style={{ minHeight: dimensions.height - 140 }}>
                <FlatList
                    collapsable={false}
                    data={machineTypes}
                    renderItem={({ item }) => (
                        <Button
                            style={styles.button}
                            onPress={() =>
                                navigation.navigate(ROUTE_KEYS.DASHBOARD, { id: item.id })
                            }>
                            {item.name}
                        </Button>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    button: {
        marginVertical: 5,
    },
});

export default memo(CustomDrawer);
