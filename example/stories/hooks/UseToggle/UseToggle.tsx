import { ProvideMolecules, useMolecules, useToggle } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text, Switch } = useMolecules();
    const { state: isToggled, onToggle } = useToggle();

    return (
        <View>
            <Text>Toggleable Switch</Text>
            <Switch value={isToggled} onValueChange={onToggle} />
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
