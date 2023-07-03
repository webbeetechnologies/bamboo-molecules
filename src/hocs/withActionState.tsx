import { ComponentType, forwardRef, PropsWithoutRef, useRef } from 'react';
import type { ViewProps } from 'react-native';
import { useFocus, useHover, useActive } from 'react-native-web-hooks';
import { useMolecules } from '../hooks';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
    actionStateContainerProps?: PropsWithoutRef<ViewProps>;
};

// P is for type-assertion of the wrapped component props
// only works for Web
const withActionState = <P extends CallbackActionState>(Component: ComponentType<P>) =>
    forwardRef((props: P, ref: any) => {
        const {
            actionStateContainerProps,
            hovered: hoveredProp,
            focused: focusedProp,
            pressed: pressedProp,
            ...rest
        } = props as P & {
            actionStateContainerProps?: PropsWithoutRef<ViewProps>;
        };
        const { View } = useMolecules();

        const actionsRef = useRef(null);
        const hovered = useHover(actionsRef) || hoveredProp;
        const pressed = useActive(actionsRef) || pressedProp;
        const focused = useFocus(actionsRef) || focusedProp;

        return (
            <View ref={actionsRef} {...actionStateContainerProps}>
                <Component
                    {...{
                        pressed,
                        focused,
                        hovered,
                    }}
                    {...(rest as P)}
                    ref={ref}
                />
            </View>
        );
    });

export default withActionState;
