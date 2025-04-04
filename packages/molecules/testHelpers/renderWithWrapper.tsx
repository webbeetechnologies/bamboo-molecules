import type { ReactElement, JSXElementConstructor, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ProvideMolecules } from '../src';

export const renderWithWrapper = <P extends {} = {}>(
    component: ReactElement<P, string | JSXElementConstructor<P>>,
    options?: RenderOptions,
): ReturnType<typeof render> => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <ProvideMolecules>{children}</ProvideMolecules>
    );

    return render(component, { wrapper: Wrapper, ...options });
};
