import type { ComponentType } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useMolecules } from 'bamboo-molecules';
import { useNavigation, useRoute } from '@react-navigation/core';

const withDashboardLayout =
    <P,>(Component: ComponentType<P>) =>
    (props: P) => {
        const { IconButton, Surface, Text } = useMolecules();
        const navigation = useNavigation<{ openDrawer: () => any }>();
        const route = useRoute();

        return (
            <SafeAreaView style={styles.container}>
                <Surface style={styles.topBar}>
                    <IconButton
                        name="menu"
                        style={styles.iconButton}
                        onPress={() => navigation.openDrawer()}
                    />
                    <Text style={styles.title}>{route.name}</Text>
                    <Text />
                </Surface>
                <Component {...props} />
            </SafeAreaView>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 100,
        position: 'relative',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    iconButton: {},
    title: {
        marginLeft: -50,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default withDashboardLayout;
