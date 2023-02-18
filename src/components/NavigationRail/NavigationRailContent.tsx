import { ComponentType, memo } from 'react';
import type { ScrollViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ScrollViewProps & {
    /**
     * ContainerComponent prop allows to replace the default container used in DrawerContent - ScrollView
     * */
    ContainerComponent?: ComponentType<any>;
};

const NavigationRailContent = memo(({ style, children, ContainerComponent, ...rest }: Props) => {
    const { View } = useMolecules();
    const Container = ContainerComponent || View;
    const componentStyles = useComponentStyles('NavigationRail_Content', style);

    return (
        <Container style={componentStyles} {...rest}>
            {children}
        </Container>
    );
});

NavigationRailContent.displayName = 'NavigationRail_Content';

export default NavigationRailContent;
