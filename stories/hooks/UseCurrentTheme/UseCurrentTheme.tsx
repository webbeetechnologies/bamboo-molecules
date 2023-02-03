import { useCurrentTheme, useMolecules } from '../../../src';

export const Example = () => {
    const { View, Text } = useMolecules();
    const currentTheme = useCurrentTheme();

    return (
        <View>
            <Text>{JSON.stringify(currentTheme, null, 4)}</Text>
        </View>
    );
};
