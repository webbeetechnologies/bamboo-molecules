import { memo } from 'react';
import { Pressable } from 'react-native';
import { useComponentStyles } from '../../hooks';
import type { BackdropProps } from './types';

const Backdrop = ({ style, ...rest }: BackdropProps) => {
    const componentStyles = useComponentStyles('Backdrop', style);

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
