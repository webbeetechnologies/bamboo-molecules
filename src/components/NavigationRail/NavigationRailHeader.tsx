import { memo } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

const NavigationRailHeader = memo(({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('NavigationRail_Header', style);

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
});

NavigationRailHeader.displayName = 'NavigationRail_Footer';

export default NavigationRailHeader;
