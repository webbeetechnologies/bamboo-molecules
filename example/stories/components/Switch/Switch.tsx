import { useMolecules, useToggle, SwitchProps } from 'bamboo-molecules';

export type Props = SwitchProps & {};

export const Example = (props: Props) => {
    const { Switch } = useMolecules();
    const [isOn, toggle] = useToggle();

    return <Switch value={isOn} onValueChange={toggle} {...props} />;
};
