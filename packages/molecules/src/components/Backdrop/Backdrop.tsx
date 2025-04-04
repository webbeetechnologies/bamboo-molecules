import { memo, useMemo } from 'react';
import type { BackdropProps } from './types';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { backdropStyles } from './utils';

const Backdrop = ({ style, ...rest }: BackdropProps) => {
    const componentStyles = useMemo(() => [backdropStyles.root, style], [style]);

    return (
        <Pressable
            accessible={false}
            importantForAccessibility="no"
            {...rest}
            style={componentStyles as StyleProp<ViewStyle>}
        />
    );
};

export default memo(Backdrop);
