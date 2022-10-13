import { useTheme, useColorMode } from './index';

const useCurrentTheme = () => {
    const colorMode = useColorMode();

    return useTheme()[colorMode];
};

export default useCurrentTheme;
