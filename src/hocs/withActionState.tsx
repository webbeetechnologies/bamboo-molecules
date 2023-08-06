import { ComponentType, forwardRef, PropsWithoutRef } from 'react';
import type { ViewProps } from 'react-native';
import { UseActionStateProps, useMolecules, useActionState } from '../hooks';

export type CallbackActionState = UseActionStateProps & {
    actionStateContainerProps?: PropsWithoutRef<ViewProps>;
};

// P is for type-assertion of the wrapped component props
// only works for Web
const withActionState = <P extends CallbackActionState>(Component: ComponentType<P>) => {
    const ComponentWithActionState = forwardRef((props: P, ref: any) => {
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

        const { actionsRef, hovered, pressed, focused } = useActionState({
            hovered: hoveredProp,
            focused: focusedProp,
            pressed: pressedProp,
        });

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

    if (Component.displayName)
        ComponentWithActionState.displayName = Component.displayName + 'WithActionState';

    return ComponentWithActionState;
};

export default withActionState;
