import { useCallback, useMemo, useState } from 'react';

const useToggle = (initialState = false): [boolean, () => void] => {
    const [state, setState] = useState<boolean>(initialState);

    const toggle = useCallback(() => setState(prevState => !prevState), []);

    return useMemo(() => [state, toggle], [state, toggle]);
};

export default useToggle;
