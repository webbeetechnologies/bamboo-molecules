import { Link, LinkProps } from '../../../src/components';

export type Props = LinkProps & {};

export const Example = (props: Props) => {
    return <Link {...props} />;
};
