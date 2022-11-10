import { ProvideMolecules, useMolecules, useToggle } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text, Switch } = useMolecules();
    const [isToggled, toggleSwitch] = useToggle();

    return (
        <View>
            <Text>Toggleable Switch</Text>
            <Switch value={isToggled} onValueChange={toggleSwitch} />
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
