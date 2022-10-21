import { ComponentType, forwardRef } from 'react';
import { Pressable } from 'react-native';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

// P is for type-assertion of the wrapped component props
const withActionState = <P,>(Component: ComponentType<P>) =>
    forwardRef((props: P, ref: any) => {
        return <Pressable>{state => <Component {...state} {...props} ref={ref} />}</Pressable>;
    });

export default withActionState;
