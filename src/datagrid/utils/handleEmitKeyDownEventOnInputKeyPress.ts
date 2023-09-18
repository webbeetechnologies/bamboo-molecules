import { Platform } from 'react-native';

export const handleEmitNativeEvent = (type: string, e: KeyboardEvent) => {
    if (Platform.OS !== 'web') return;

    document.dispatchEvent(new KeyboardEvent(type, e));
};
