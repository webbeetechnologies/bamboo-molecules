import { useMolecules, BadgeProps } from 'bamboo-molecules';

export type Props = BadgeProps & {};

export const Example = (props: Props) => {
    const { Badge } = useMolecules();

    return <Badge {...props} />;
};
