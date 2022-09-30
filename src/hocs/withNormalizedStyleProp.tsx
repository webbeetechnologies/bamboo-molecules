import type { ComponentType } from 'react';
import { normalizeStyles } from '../utils';
import { useCurrentTheme } from '../hooks';

// P is for type-assertion of the wrapped component props
const withNormalizedStyleProp =
    <P,>(Component: ComponentType<P>) =>
    // @ts-ignore
    ({ style, ...rest }: P) => {
        const currentTheme = useCurrentTheme();

        // @ts-ignore
        return <Component style={normalizeStyles(style, currentTheme)} {...rest} />;
    };

export default withNormalizedStyleProp;
