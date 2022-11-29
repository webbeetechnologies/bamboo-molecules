import type { ReactElement, JSXElementConstructor, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { ProvideMolecules } from 'bamboo-molecules';

// @ts-ignore
export const renderWithWrapper = (
    component: ReactElement<any, string | JSXElementConstructor<any>>,
    options?: RenderOptions,
) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <ProvideMolecules>{children}</ProvideMolecules>
    );

    return render(component, { wrapper: Wrapper, ...options });
};
