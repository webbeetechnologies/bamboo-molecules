import { Rating, RatingProps } from '../../../src/components';

export type Props = RatingProps & {};

export const Example = (props: Props) => {
    return <Rating {...props} />;
};
