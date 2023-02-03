import { Badge, BadgeProps } from '../../../src/components';

export type Props = BadgeProps & {};

export const Example = (props: Props) => {
    return <Badge {...props} />;
};
