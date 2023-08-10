import { useMemo } from 'react';
import { get } from '../utils/lodash';
import { maybeIsToken } from '../utils/normalizeStyles';
import useCurrentTheme from './useCurrentTheme';

export const useToken = (value: string) => {
    const currentTheme = useCurrentTheme();

    return useMemo(() => {
        if (!maybeIsToken(value)) return;
        return get(currentTheme, value);
    }, [currentTheme, value]);
};

export default useToken;
