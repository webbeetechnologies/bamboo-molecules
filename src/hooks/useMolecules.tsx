import { useComponents } from '@webbee/bamboo-atoms';
import type { DefaultComponents } from '../core/components/types';

const useMolecules = <T,>() => {
    return useComponents<T & DefaultComponents>();
};

export default useMolecules;
