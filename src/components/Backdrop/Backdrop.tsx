import { memo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { BackdropProps } from './types';

const Backdrop = ({ style, ...rest }: BackdropProps) => {
    const componentStyles = useComponentStyles('Backdrop', style);
    const { Pressable } = useMolecules();

    return (
        <Pressable
            accessible={false}
            importantForAccessibility="no"
            {...rest}
            style={componentStyles}
        />
    );
};

export default memo(Backdrop);
