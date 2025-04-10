import { ComponentType, forwardRef, PropsWithoutRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { UseActionStateProps, useActionState } from '../hooks/useActionState';

export type CallbackActionState = UseActionStateProps & {
    actionStateContainerProps?: PropsWithoutRef<ViewProps>;
};

// P is for type-assertion of the wrapped component props
// only works for Web
export const withActionState = <P extends CallbackActionState>(Component: ComponentType<P>) => {
    // @ts-expect-error // TODO - fix ts issues
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
