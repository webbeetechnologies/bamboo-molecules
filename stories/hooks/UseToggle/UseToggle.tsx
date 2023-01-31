import { useMolecules, useToggle } from '../../../src';
import { Switch } from '../../../src/components';

export const Example = () => {
    const { View, Text } = useMolecules();
    const { state: isToggled, onToggle } = useToggle();

    return (
        <View>
            <Text>Toggleable Switch</Text>
            <Switch value={isToggled} onValueChange={onToggle} />
        </View>
    );
};
