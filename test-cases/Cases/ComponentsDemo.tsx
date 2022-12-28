import { extendTheme, ProvideMolecules, useMolecules, useColorMode } from 'bamboo-molecules';

const theme = extendTheme({
    colorMode: 'light',
    Text: {
        color: 'colors.onSurface',
    },
    Label: {
        color: 'colors.onSurface',
        fontSize: 18,
    },
});

const Example = () => {
    const { View, IconButton, Label } = useMolecules();

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <View
            style={{
                backgroundColor: colorMode === 'light' ? '#fff' : '#424242',
                margin: -15,
                padding: 15,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Label>ColorMode - {colorMode}</Label>
                <IconButton
                    size="lg"
                    type="material-community"
                    name={colorMode === 'light' ? 'white-balance-sunny' : 'weather-night'}
                    onPress={toggleColorMode}
                />
            </View>
        </View>
    );
};

export const ComponentsDemo = () => {
    return (
        <ProvideMolecules theme={theme}>
            <Example />
        </ProvideMolecules>
    );
};
