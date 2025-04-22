import { Portal } from '../components/Portal';
import { type ComponentType } from 'react';

const withPortal =
    <T,>(Component: ComponentType<T>) =>
    (props: T) => {
        return (
            <Portal name={'withPortal' + (Component.displayName ?? '')}>
                {/* @ts-ignore */}
                <Component {...(props as T)} />
            </Portal>
        );
    };

export default withPortal;
