import { ComponentType, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import { normalizeStyles } from '../utils';
import { useCurrentTheme } from '../hooks';

// P is for type-assertion of the wrapped component props
const withNormalizedStyleProp =
    <P extends ViewProps>(Component: ComponentType<P>) =>
    ({ style, ...rest }: P) => {
        const currentTheme = useCurrentTheme();
        const normalizedStyles = useMemo(
            () => normalizeStyles(style, currentTheme),
            [currentTheme, style],
        );

        // @ts-ignore TODO fix TS error
        return <Component style={normalizedStyles} {...rest} />;
    };

export default withNormalizedStyleProp;
