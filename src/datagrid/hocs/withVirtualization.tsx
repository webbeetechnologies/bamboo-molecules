import type { ComponentType } from 'react';
// import { useIntersectionObserver } from '../../intersection-observer';

const withVirtualization = <T,>(Component: ComponentType<T>) => {
    return (props: T) => {
        // const viewRef = useRef(null);
        // const isIntersecting = useIntersectionObserver(props.wrapperRef);
        //
        // if (!isIntersecting) return null;

        // if (props.column === '_name-1' && props.row === 'record-3')
        //     console.log({ isIntersecting, column: props.column, row: props.row });

        return <Component {...props} />;
    };
};

export default withVirtualization;
