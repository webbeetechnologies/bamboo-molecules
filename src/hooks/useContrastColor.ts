import { useMemo } from 'react';
import { resolveContrastColor } from '../utils';
import { useColorMode } from '@bambooapp/bamboo-atoms';

export const useContrastColor = (bgColor: string, lightColor?: string, darkColor?: string) => {
    const isDarkMode = useColorMode().colorMode === 'dark';

    return useMemo(
        () => resolveContrastColor(bgColor, lightColor, darkColor, isDarkMode),
        [bgColor, lightColor, darkColor, isDarkMode],
    );
};

export default useContrastColor;
