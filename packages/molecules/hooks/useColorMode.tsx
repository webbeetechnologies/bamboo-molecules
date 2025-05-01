import { useMemo } from 'react';
import { ColorMode, resolveColorMode } from '../utils/resolveColorMode';
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles';

const useColorMode = () => {
    const themeName = useUnistyles().theme.dark ? 'dark' : 'light';
    return useMemo(
        () => ({
            colorMode: resolveColorMode(themeName as ColorMode),
            setColorMode: UnistylesRuntime.setTheme,
        }),
        [themeName],
    );
};

export default useColorMode;
