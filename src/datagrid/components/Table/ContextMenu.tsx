import { memo, ReactElement, ReactNode } from 'react';

import { useMolecules } from '../../../hooks';
import type { MenuProps } from '../../../components';
import { useCellFocusMethods } from '../../plugins';

export type Props = Omit<MenuProps, 'triggerRef' | 'children'> & {
    children?: ReactNode;
};

const ContextMenu = ({ isOpen, onClose, children, ...rest }: Props) => {
    const { Menu } = useMolecules();

    const { useFocusedCellRef } = useCellFocusMethods();
    const focusedCellRef = useFocusedCellRef();

    return (
        <Menu isOpen={isOpen} triggerRef={focusedCellRef} onClose={onClose} {...rest}>
            {children as ReactElement}
        </Menu>
    );
};

export default memo(ContextMenu);
