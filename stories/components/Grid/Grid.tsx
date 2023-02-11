import { memo } from 'react';
import type { GridProps } from '../../../src/components';
import { useMolecules } from '../../../src';

export const Example = memo((props: GridProps) => {
    const { Grid } = useMolecules();
    return <Grid {...props} />;
});
