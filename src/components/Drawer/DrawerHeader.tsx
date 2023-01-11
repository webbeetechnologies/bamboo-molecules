import { memo } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

const DrawerHeader = memo(({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Drawer_Header', style);

    return (
        <View style={componentStyles} {...rest}>
            {children}
        </View>
    );
});

DrawerHeader.displayName = 'Drawer_Header';

export default DrawerHeader;
