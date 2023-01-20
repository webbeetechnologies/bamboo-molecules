import { useMolecules } from 'bamboo-molecules';
import type { LinkProps } from 'bamboo-molecules/components';

export type Props = LinkProps & {};

export const Example = (props: Props) => {
    const { Link } = useMolecules();

    return <Link {...props} />;
};
