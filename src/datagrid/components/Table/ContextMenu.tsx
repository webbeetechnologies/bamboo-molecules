import { useMolecules } from '../../../hooks';
import type { MenuProps } from '../../../components';
import { memo, ReactElement, ReactNode } from 'react';

import { useTableManagerStoreRef } from '../../contexts';

export type Props = Omit<MenuProps, 'triggerRef' | 'children'> & {
    children?: ReactNode;
};

const ContextMenu = ({ isOpen, onClose, children, ...rest }: Props) => {
    const { Menu } = useMolecules();

    const { store } = useTableManagerStoreRef();

    return (
        <Menu isOpen={isOpen} triggerRef={store.current.focusedCellRef} onClose={onClose} {...rest}>
            {children as ReactElement}
        </Menu>
    );
};

export default memo(ContextMenu);
