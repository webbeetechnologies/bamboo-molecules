import { ComponentType, forwardRef, useRef } from 'react';
import { View } from 'react-native';
import { useFocus, useHover, useActive } from 'react-native-web-hooks';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

// P is for type-assertion of the wrapped component props
// only works for Web
const withActionState = <P,>(Component: ComponentType<P>) =>
    forwardRef((props: P, ref: any) => {
        const actionsRef = useRef(null);
        const hovered = useHover(actionsRef);
        const pressed = useActive(actionsRef);
        const focused = useFocus(actionsRef);

        return (
            <View ref={actionsRef}>
                <Component
                    {...{
                        pressed,
                        focused,
                        hovered,
                    }}
                    {...props}
                    ref={ref}
                />
            </View>
        );
    });

export default withActionState;
