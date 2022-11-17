import React, { memo, forwardRef, useCallback } from 'react';
import Transition from './Transition';
import ExitAnimationContext from '../ExitAnimationContext';

import type { PresenceTransitionProps } from './Transition.types';

const PresenceTransition = (
    { visible = false, onTransitionComplete, ...rest }: PresenceTransitionProps,
    ref: any,
) => {
    const { setExited } = React.useContext(ExitAnimationContext);

    const handleTransitionComplete = useCallback(
        (state: 'entered' | 'exited') => {
            if (state === 'exited') {
                setExited(true);
            } else {
                setExited(false);
            }
            onTransitionComplete && onTransitionComplete(state);
        },
        [setExited, onTransitionComplete],
    );

    return (
        <Transition
            visible={visible}
            onTransitionComplete={handleTransitionComplete}
            {...rest}
            ref={ref}
        />
    );
};

export default memo(forwardRef(PresenceTransition));
