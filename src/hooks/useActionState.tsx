import { useRef } from 'react';
import { useActive, useFocus, useHover } from 'react-native-web-hooks';

export type UseActionStateProps = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

export const useActionState = (
    props = {} as Omit<UseActionStateProps, 'actionStateContainerProps'>,
) => {
    const actionsRef = useRef(null);
    const hovered = useHover(actionsRef) || props.hovered;
    const pressed = useActive(actionsRef) || props.pressed;
    const focused = useFocus(actionsRef) || props.focused;

    return {
        actionsRef,
        hovered,
        pressed,
        focused,
    };
};
