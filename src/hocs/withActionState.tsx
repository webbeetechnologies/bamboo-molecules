import { ComponentType, forwardRef } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export type CallbackActionState = {
    pressed?: boolean;
    hovered?: boolean;
    focused?: boolean;
};

// P is for type-assertion of the wrapped component props
const withActionState = <P,>(Component: ComponentType<P>) =>
    forwardRef((props: P, ref: any) => {
        return (
            <Pressable style={styles.pressable}>
                {state => <Component {...state} {...props} ref={ref} />}
            </Pressable>
        );
    });

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
    },
});

export default withActionState;
