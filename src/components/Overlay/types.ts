import type { ViewStyle } from 'react-native';

export type OverlayProps = {
    isOpen?: boolean;
    children?: any;
    // We use RN modal on android if needed as it supports shifting accessibility focus to the opened view. IOS automatically shifts focus if an absolutely placed view appears in front.
    useRNModalOnAndroid?: boolean;
    onRequestClose?: (() => any) | undefined;
    isKeyboardDismissable?: boolean;
    animationPreset?: 'fade' | 'slide' | 'none';
    style?: ViewStyle;
};
