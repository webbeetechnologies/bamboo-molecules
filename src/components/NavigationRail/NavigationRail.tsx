import { memo, ReactElement } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules, useSubcomponents } from '../../hooks';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
};
const allowedChildren = [
    'NavigationRail_Header',
    'NavigationRail_Content',
    'NavigationRail_Footer',
];

const NavigationRail = ({ children, style, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('NavigationRail', style);

    const { NavigationRail_Header, NavigationRail_Content, NavigationRail_Footer } =
        useSubcomponents({
            children,
            allowedChildren,
        });

    return (
        <View style={componentStyles} {...rest}>
            {NavigationRail_Header[0]}
            {NavigationRail_Content[0]}
            {NavigationRail_Footer[0]}
        </View>
    );
};

export default memo(NavigationRail);
