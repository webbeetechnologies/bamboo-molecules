import { useCallback, useMemo, useState } from 'react';

const useToggle = (
    initialState = false,
): { state: boolean; onToggle: () => void; setState: (newState: boolean) => void } => {
    const [state, setState] = useState<boolean>(initialState);

    const toggle = useCallback(() => setState(prevState => !prevState), []);

    return useMemo(
        () => ({
            state,
            onToggle: toggle,
            setState,
        }),
        [state, toggle],
    );
};

export default useToggle;
