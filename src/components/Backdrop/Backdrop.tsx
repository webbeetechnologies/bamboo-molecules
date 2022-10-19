import React from 'react';
import {Pressable} from 'react-native';
import {styles} from './utils';
import type {BackdropProps} from './types';

const Backdrop: React.FC<BackdropProps> = (props) => {
    return (
        <Pressable
            style={styles.backdrop}
            accessible={false}
            importantForAccessibility="no"
            {...props}
        />
    );
};

export default React.memo(Backdrop);
