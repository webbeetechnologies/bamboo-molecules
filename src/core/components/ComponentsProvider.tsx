import { ReactNode, useMemo } from 'react';
import {
    IExtendComponentsTypes,
    ProvideComponents as AtomsProvideComponents,
    ConsumeComponents as AtomsConsumeComponents,
} from '@webbee/bamboo-atoms';
import { Icon } from '../../components';
import type { DefaultComponents, ProvideComponentsProps } from './types';

/**
 * All component platform-specific themes will be exported in the same file
 * for android and ios, the corresponding themes will be exported
 * for web, need to create a function that'll set the user input theme.
 * The value of user input will be stored in a variable and will be used to decide which theme will be exported if the platform isn't mobile // need more discussion
 * Components like Icons are neutral, they don't have platform specific styles.
 * Example implementation below
 */
const defaultComponents = {
    Icon: Icon,
};

export const ProvideComponents = ({ components = {}, children }: ProvideComponentsProps) => {
    const memoizedValue = useMemo(
        () => ({
            ...defaultComponents,
            ...components,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return <AtomsProvideComponents components={memoizedValue}>{children}</AtomsProvideComponents>;
};

export const ConsumeComponents = <T extends DefaultComponents>({
    children,
}: {
    children: (comp: IExtendComponentsTypes<T>) => ReactNode;
}) => {
    return <AtomsConsumeComponents>{children}</AtomsConsumeComponents>;
};
