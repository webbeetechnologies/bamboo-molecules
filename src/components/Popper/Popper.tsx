import { PopperContext } from "./PopperContext";

import type { FC, PropsWithChildren} from "react";
import type {TPopperContext} from "./types";

const Popper: FC<PropsWithChildren<TPopperContext>> = ({children, ...props}: any) => {
    return <PopperContext.Provider value={props} children={children}/>
}

export default Popper