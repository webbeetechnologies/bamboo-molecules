import type { ComponentType } from 'react';
import { normalizeStyles } from '../utils';
import { useCurrentTheme } from '../hooks';
import { useMemo } from 'react';

// P is for type-assertion of the wrapped component props
const withNormalizedStyleProp =
    <P,>(Component: ComponentType<P>) =>
    // @ts-ignore
    ({ style, ...rest }: P) => {
        const currentTheme = useCurrentTheme();
        const normalizedStyles = useMemo(
            () => normalizeStyles(style, currentTheme),
            [currentTheme, style],
        );

        // @ts-ignore
        return <Component style={normalizedStyles} {...rest} />;
    };

export default withNormalizedStyleProp;
