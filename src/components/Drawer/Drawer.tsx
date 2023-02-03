import { memo, ReactElement } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules, useSubcomponents } from '../../hooks';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
};

const allowedChildren = ['Drawer_Footer', 'Drawer_Header', 'Drawer_Content'];

const Drawer = ({ style, children, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Drawer', style);

    const { Drawer_Header, Drawer_Footer, Drawer_Content } = useSubcomponents({
        children,
        allowedChildren,
    });

    return (
        <View style={componentStyles} {...rest}>
            {Drawer_Header[0]}
            {Drawer_Content[0]}
            {Drawer_Footer[0]}
        </View>
    );
};

export default memo(Drawer);
