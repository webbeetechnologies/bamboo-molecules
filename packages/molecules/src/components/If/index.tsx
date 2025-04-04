import { PropsWithChildren } from 'react';
import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';

export const IfDefault = (props: PropsWithChildren<{ shouldRender?: boolean }>) => {
    return <>{!!props.shouldRender && props.children}</>;
};

registerMoleculesComponents({
    If: IfDefault,
});

export const If = getRegisteredMoleculesComponent('If');
