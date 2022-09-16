import { useComponents } from '@webbee/bamboo-atoms';
import type { DefaultComponents } from '../core/components/types';

const useMolecules = <T extends DefaultComponents>() => {
    return useComponents<T>();
};

export default useMolecules;
