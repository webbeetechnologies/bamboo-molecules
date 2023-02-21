import { OverlayContainer } from '@react-native-aria/overlays';
import { memo, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useKeyboardDismissable } from '../../hooks';
import { ExitAnimationContext } from '../Animations';
import type { OverlayProps } from './types';

const Overlay = ({
    isOpen,
    children,
    onRequestClose,
    animationPreset = 'fade',
    isKeyboardDismissable = true,
    style,
}: OverlayProps) => {
    const [exited, setExited] = useState(!isOpen);

    useKeyboardDismissable({
        enabled: isOpen && isKeyboardDismissable,
        callback: onRequestClose ? onRequestClose : () => {},
    });

    const value = useMemo(() => {
        return { exited, setExited };
    }, [exited, setExited]);

    const styleObj = useMemo(() => {
        const styles = { ...StyleSheet.absoluteFillObject, ...style };
        if (animationPreset === 'slide') {
            styles.overflow = 'hidden';
            styles.display = 'flex';
        } else {
            styles.display = exited && !isOpen ? 'none' : 'flex';
        }

        return styles;
    }, [style, animationPreset, exited, isOpen]);

    return (
        <ExitAnimationContext.Provider value={value}>
            <OverlayContainer style={styleObj}>{children}</OverlayContainer>
        </ExitAnimationContext.Provider>
    );
};

export default memo(Overlay);
