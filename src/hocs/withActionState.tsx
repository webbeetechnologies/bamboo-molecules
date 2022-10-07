import type { ComponentType } from 'react';
import { Pressable } from 'react-native';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

// P is for type-assertion of the wrapped component props
const withActionState =
    <P,>(Component: ComponentType<P>) =>
    (props: P) => {
        return <Pressable>{state => <Component {...state} {...props} />}</Pressable>;
    };

export default withActionState;
