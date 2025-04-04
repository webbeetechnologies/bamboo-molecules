import { memo, ReactElement } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSubcomponents } from '../../hooks';
import { drawerStyles } from './utils';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
};

const allowedChildren = ['Drawer_Footer', 'Drawer_Header', 'Drawer_Content'];

const Drawer = ({ style, children, ...rest }: Props) => {
    const { Drawer_Header, Drawer_Footer, Drawer_Content } = useSubcomponents({
        children,
        allowedChildren,
    });

    return (
        <View style={[drawerStyles.root, style]} {...rest}>
            {Drawer_Header[0]}
            {Drawer_Content[0]}
            {Drawer_Footer[0]}
        </View>
    );
};

export default memo(Drawer);
