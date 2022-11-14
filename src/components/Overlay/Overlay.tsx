import { OverlayContainer } from '@react-native-aria/overlays';
import { memo, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { Modal } from 'react-native';
import { useKeyboardDismissable } from '../../hooks';
import { ExitAnimationContext } from '../Animations';
import type { OverlayProps } from './types';

const Overlay = ({
    isOpen,
    children,
    onRequestClose,
    animationPreset = 'fade',
    useRNModalOnAndroid = false,
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
        const styleObj = { ...style };
        if (animationPreset === 'slide') {
            styleObj.overflow = 'hidden';
            styleObj.display = 'flex';
        } else {
            styleObj.display = exited && !isOpen ? 'none' : 'flex';
        }

        return style;
    }, [style, animationPreset]);

    if (Platform.OS === 'android' && useRNModalOnAndroid) {
        return (
            <ExitAnimationContext.Provider value={value}>
                <Modal
                    transparent
                    visible={isOpen}
                    onRequestClose={onRequestClose}
                    animationType={animationPreset}>
                    {children}
                </Modal>
            </ExitAnimationContext.Provider>
        );
    }

    return (
        <ExitAnimationContext.Provider value={value}>
            <OverlayContainer style={styleObj}>{children}</OverlayContainer>
        </ExitAnimationContext.Provider>
    );
};

export default memo(Overlay);
