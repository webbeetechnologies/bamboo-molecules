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
        <View>
            <View>
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
