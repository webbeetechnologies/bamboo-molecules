import { useTheme } from './useTheme';
import { useMemo } from 'react';

const useBreakpoints = () => {
    const { grid } = useTheme();

    return useMemo(() => grid.breakpoints, [grid]);
};

export default useBreakpoints;
