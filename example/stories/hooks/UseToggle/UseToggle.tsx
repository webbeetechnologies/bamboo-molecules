import { useMolecules, useToggle } from 'bamboo-molecules';

export const Example = () => {
    const { View, Text, Switch } = useMolecules();
    const [isToggled, toggleSwitch] = useToggle();

    return (
        <View>
            <Text>Toggleable Switch</Text>
            <Switch value={isToggled} onValueChange={toggleSwitch} />
        </View>
    );
};
