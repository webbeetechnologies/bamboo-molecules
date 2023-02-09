import { memo, ReactElement, useContext } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import { AppbarContext } from './AppbarBase';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement;
};

const AppbarLeft = memo(({ children, style, ...rest }: Props) => {
    const { View } = useMolecules();
    const { type } = useContext(AppbarContext);
    const componentStyles = useComponentStyles('Appbar_Left', [
        {
            marginRight: type === 'small' ? 'spacings.4' : 'spacings.6',
        },
        style,
    ]);

    return (
        <View {...rest} style={componentStyles}>
            {children}
        </View>
    );
});

AppbarLeft.displayName = 'Appbar_Left';

export default AppbarLeft;
