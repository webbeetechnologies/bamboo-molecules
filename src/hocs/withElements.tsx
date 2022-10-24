import { ComponentType, forwardRef, ReactNode } from 'react';

export type WithElementsProps = {
    right?: ReactNode;
    left?: ReactNode;
};

// P is for type-assertion of the wrapped component props
const withElements = <P,>(Component: ComponentType<P & WithElementsProps>) =>
    forwardRef((props: P, ref: any) => {
        return <Component {...props} ref={ref} />;
    });

export default withElements;
