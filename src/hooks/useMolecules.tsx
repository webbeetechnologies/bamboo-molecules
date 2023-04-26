import { useComponents } from '@bambooapp/bamboo-atoms';

const useMolecules = <T,>() => {
    return useComponents<T & DefaultComponents>();
};

export default useMolecules;
