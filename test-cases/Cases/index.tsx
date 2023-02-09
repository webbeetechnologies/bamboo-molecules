import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useMolecules, ProvideMolecules } from 'bamboo-molecules';

const style = StyleSheet.create({
    wrap: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        gap: 15,
        padding: 15,
    },
    cardTitle: {
        marginHorizontal: -2,
        marginTop: -2,
        marginBottom: 16,
        backgroundColor: '#d5d5d5',
    },
});

const Components = () => {
    const { Button } = useMolecules();

    return <Button variant="contained">Contained Button </Button>;
};

export default () => {
    return (
        <ProvideMolecules>
            <SafeAreaView style={style.wrap}>
                <Components />
            </SafeAreaView>
        </ProvideMolecules>
    );
};
