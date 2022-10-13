import React, { memo, forwardRef } from 'react';
import { Transition } from './Transition';
import type { IPresenceTransitionProps } from './Transition.types';
import { ExitAnimationContext } from './ExitAnimationContext';


export const PresenceTransition = memo(forwardRef((
  { visible = false, onTransitionComplete, ...rest }: IPresenceTransitionProps,
  ref: any
) => {
  // const [animationExited, setAnimationExited] = React.useState(!visible);

  const { exited, setExited } = React.useContext(ExitAnimationContext);

  return (
    <Transition
      visible={visible}
      onTransitionComplete={(state) => {
        if (state === 'exited') {
          setExited(true);
        } else {
          setExited(false);
        }
        onTransitionComplete && onTransitionComplete(state);
      }}
      {...rest}
      ref={ref}
    />
  );
}));

