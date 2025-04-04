import { useMemo } from 'react';
import { ColorMode, resolveColorMode } from '../utils/resolveColorMode';
import { UnistylesRuntime } from 'react-native-unistyles';

const useColorMode = () => {
    return useMemo(
        () => ({
            colorMode: resolveColorMode(UnistylesRuntime.themeName as ColorMode),
            setColorMode: UnistylesRuntime.setTheme,
        }),
        [],
    );
};

export default useColorMode;
