import { memo } from 'react';

import { useMolecules } from '../../hooks';
import type { HorizontalDividerProps } from '../HorizontalDivider';

export type Props = HorizontalDividerProps & {};

const MenuDivider = memo(({ spacing = 8, ...rest }: Props) => {
    const { HorizontalDivider } = useMolecules();

    return <HorizontalDivider spacing={spacing} {...rest} />;
});

MenuDivider.displayName = 'MenuDivider';

export default MenuDivider;
