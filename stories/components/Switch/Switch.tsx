import { useToggle } from '../../../src';
import { CustomSwitch, SwitchProps } from '../../../src/components';

export type Props = SwitchProps & {
    onIcon?: string;
    offIcon?: string;
    size?: number;
};

export const Example = (props: Props) => {
    const { state: isOn, onToggle } = useToggle();

    return (
        <CustomSwitch
            onValueChange={onToggle}
            value={isOn}
            onIcon={props.onIcon}
            offIcon={props.offIcon}
            disabled={props.disabled}
            {...props}
        />
    );

    // return <Switch value={isOn} onValueChange={onToggle} {...props} />;
};
