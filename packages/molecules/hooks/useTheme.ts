import { useUnistyles } from 'react-native-unistyles';

// @ts-ignore
export const useTheme: <T extends ITheme>() => T = () => useUnistyles().theme;
