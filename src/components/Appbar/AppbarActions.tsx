import { memo } from 'react';
import { useMolecules } from '../../hooks';
import type { IconButtonProps } from '../IconButton';

export type Props = IconButtonProps & {};

const AppbarActions = memo(({ size = 24, ...rest }: Props) => {
    const { IconButton } = useMolecules();

    return <IconButton size={size} {...rest} />;
});

AppbarActions.displayName = 'Appbar.Actions';

export default AppbarActions;
