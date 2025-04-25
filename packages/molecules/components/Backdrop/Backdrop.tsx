import { memo } from 'react';
import type { BackdropProps } from './types';
import { Pressable } from 'react-native';
import { backdropStyles } from './utils';

const Backdrop = ({ style, ...rest }: BackdropProps) => {
    return (
        <Pressable
            accessible={false}
            importantForAccessibility="no"
            {...rest}
            style={[backdropStyles.root, style]}
        />
    );
};

export default memo(Backdrop);
