import { MutableRefObject, useRef } from 'react';
import { useActive, useFocus, useHover } from 'react-native-web-hooks';

export type UseActionStateProps = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

export const useActionState = (
    props: UseActionStateProps & { ref?: MutableRefObject<any> } = {},
) => {
    const ref = useRef(null);
    const actionsRef = props.ref ?? ref;
    const hovered = useHover(actionsRef) || !!props.hovered;
    const pressed = useActive(actionsRef) || !!props.pressed;
    const focused = useFocus(actionsRef) || !!props.focused;

    return {
        actionsRef,
        hovered,
        pressed,
        focused,
    };
};
