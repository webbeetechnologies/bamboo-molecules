import { Platform } from 'react-native';

export const handleEmitKeyboardEvent = (type: string, e: KeyboardEvent) => {
    if (Platform.OS !== 'web') return;

    document.dispatchEvent(new KeyboardEvent(type, e));
};
