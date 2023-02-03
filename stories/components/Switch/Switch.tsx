import { useToggle } from '../../../src';
import { Switch, SwitchProps } from '../../../src/components';

export type Props = SwitchProps & {};

export const Example = (props: Props) => {
    const { state: isOn, onToggle } = useToggle();

    return <Switch value={isOn} onValueChange={onToggle} {...props} />;
};
