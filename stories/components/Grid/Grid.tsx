import { memo } from 'react';
import { Grid, GridProps } from '../../../src/components';

export type Props = GridProps & {};

export const Example = memo((props: Props) => {
    return <Grid {...props} />;
});
