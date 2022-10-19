import { ProvideMolecules, useCurrentTheme, useMolecules } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text } = useMolecules();
    const currentTheme = useCurrentTheme();

    return (
        <View>
            <Text>{JSON.stringify(currentTheme, null, 4)}</Text>
        </View>
    );
};

export const Example = () => {
    return (
        <ProvideMolecules>
            <Components />
        </ProvideMolecules>
    );
};
