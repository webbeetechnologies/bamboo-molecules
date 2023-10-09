import { useToggle } from '../../../src';
import { Switch, SwitchProps } from '../../../src/components';

export type Props = SwitchProps & {
    checkedIcon?: string;
    unCheckedIcon?: string;
    size?: number;
};

export const Example = (props: Props) => {
    const { state: isOn, onToggle } = useToggle();

    return (
        <Switch
            onValueChange={onToggle}
            value={isOn}
            checkedIcon={props.checkedIcon}
            unCheckedIcon={props.unCheckedIcon}
            disabled={props.disabled}
            {...props}
        />
    );
};
