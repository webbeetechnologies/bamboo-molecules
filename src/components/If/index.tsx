import type { PropsWithChildren } from 'react';

export const If = (props: PropsWithChildren<{ shouldRender?: boolean }>) => {
    return <>{!!props.shouldRender && props.children}</>;
};
