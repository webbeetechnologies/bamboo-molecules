import { PopperContext } from './PopperContext';

import type { FC, PropsWithChildren } from 'react';
import type { PopperProps } from './types';

const Popper: FC<PropsWithChildren<PopperProps>> = ({ children, ...props }) => {
    return <PopperContext.Provider value={props} children={children} />;
};

export default Popper;
