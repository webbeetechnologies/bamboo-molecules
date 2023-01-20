import { useMolecules, RatingProps } from 'bamboo-molecules';

export type Props = RatingProps & {};

export const Example = (props: Props) => {
    const { Rating } = useMolecules();

    return <Rating {...props} />;
};
