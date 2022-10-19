import { ComponentType, forwardRef } from 'react';
import { Pressable, View } from 'react-native';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

// P is for type-assertion of the wrapped component props
const withActionState =
    <P,>(Component: ComponentType<P>) =>
    forwardRef<View, P>((props: P, ref) => {

            // @ts-ignore
        const setRef = (node)=> {
            // @ts-ignore
            ref?.(node);
        }
        
        return <Pressable ref={setRef}>{state => <Component {...state} {...props} />}</Pressable>;
    });

export default withActionState;
