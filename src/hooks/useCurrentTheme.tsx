import { useColorMode } from './exports';
import useTheme from './useTheme';

const useCurrentTheme = () => {
    const { colorMode } = useColorMode();

    return useTheme()[colorMode];
};

export default useCurrentTheme;
