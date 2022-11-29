import { useMolecules, TextInputProps, IconProps } from 'bamboo-molecules';

export type Props = TextInputProps & {};

export const Example = (props: Props) => {
    const { TextInput } = useMolecules();

    return <TextInput {...props} />;
};

export const IconComponent = (props: IconProps) => {
    const { Icon } = useMolecules();

    return <Icon {...props} />;
};
