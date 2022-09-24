import { useMolecules, IconProps } from 'bamboo-molecules';

export type Props = IconProps & {};

export const Example = (props: Props) => {
    const { Icon } = useMolecules();

    return <Icon {...props} />;
};
