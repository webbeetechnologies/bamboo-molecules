import { useUnistyles } from 'react-native-unistyles';

const useCurrentTheme = () => {
    return useUnistyles().theme;
};

export default useCurrentTheme;
