import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { styles } from './utils';
import type { BackdropProps } from './types';

const Backdrop: React.FC<BackdropProps> = ({ style, ...rest }) => {
    const memoizedStyles = useMemo(() => StyleSheet.flatten([styles.backdrop, style]), [style]);

    return (
        <Pressable
            accessible={false}
            importantForAccessibility="no"
            {...rest}
            style={memoizedStyles}
        />
    );
};

export default React.memo(Backdrop);
