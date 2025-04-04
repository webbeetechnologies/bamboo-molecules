import { MutableRefObject, useRef } from 'react';

export type UseActionStateProps = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

export const useActionState = (
    props: UseActionStateProps & { ref?: MutableRefObject<any> | React.ForwardedRef<any> } = {},
) => {
    const ref = useRef(null);
    const actionsRef = (props.ref ?? ref) as MutableRefObject<any>;

    return {
        actionsRef,
        hovered: false,
        pressed: false,
        focused: false,
    };
};
