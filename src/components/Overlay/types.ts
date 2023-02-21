import type { ViewStyle } from 'react-native';

export type OverlayProps = {
    isOpen?: boolean;
    children?: any;
    onRequestClose?: (() => any) | undefined;
    isKeyboardDismissable?: boolean;
    animationPreset?: 'fade' | 'slide' | 'none';
    style?: ViewStyle;
};
