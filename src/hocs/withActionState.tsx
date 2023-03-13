import { ComponentType, forwardRef, PropsWithoutRef, useRef } from 'react';
import { View, ViewProps } from 'react-native';
import { useFocus, useHover, useActive } from 'react-native-web-hooks';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
    actionStateContainerProps?: PropsWithoutRef<ViewProps>;
};

// P is for type-assertion of the wrapped component props
// only works for Web
const withActionState = <P,>(Component: ComponentType<P>) =>
    forwardRef((props: P, ref: any) => {
        const { actionStateContainerProps, ...rest } = props as P & {
            actionStateContainerProps?: PropsWithoutRef<ViewProps>;
        };

        const actionsRef = useRef(null);
        const hovered = useHover(actionsRef);
        const pressed = useActive(actionsRef);
        const focused = useFocus(actionsRef);

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
