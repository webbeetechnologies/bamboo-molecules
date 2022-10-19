import React from 'react';

const ExitAnimationContext = React.createContext({
    exited: true,
    setExited: (_exited: boolean) => {
    },
});

export default ExitAnimationContext;