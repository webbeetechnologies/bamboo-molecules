import { memo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

const NavigationRailFooter = memo(({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('NavigationRail_Footer', style);

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
});

NavigationRailFooter.displayName = 'NavigationRail_Footer';

export default NavigationRailFooter;
