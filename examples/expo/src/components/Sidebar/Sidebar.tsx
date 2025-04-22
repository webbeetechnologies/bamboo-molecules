import { useCallback, useState } from 'react';
import {
    NavigationRail,
    NavigationRailItemProps,
} from '@bambooapp/bamboo-molecules/components/NavigationRail';
import { IconButton } from '@bambooapp/bamboo-molecules/components/IconButton';
import { FAB } from '@bambooapp/bamboo-molecules/components/FAB';
import { StyleSheet } from 'react-native-unistyles';
import { Text, View } from 'react-native';

export const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('');

    const onPressMenu = useCallback(() => {}, []);
    const onPressFAB = useCallback(() => {}, []);

    return (
        <View style={styles.sidebar}>
            <NavigationRail style={styles.container}>
                <NavigationRail.Header style={styles.header}>
                    <IconButton
                        name="menu"
                        size={24}
                        onPress={onPressMenu}
                        style={styles.menuButton}
                    />
                    <FAB iconName="pencil-outline" onPress={onPressFAB} elevation={0} />
                </NavigationRail.Header>
                <NavigationRail.Content>
                    {routesData.map(item => (
                        <NavigationRailItem
                            key={item.id}
                            {...item}
                            active={activeItem === item.id}
                            setActiveItem={setActiveItem}
                        />
                    ))}
                </NavigationRail.Content>
                <NavigationRail.Footer>
                    <Text>Footer</Text>
                </NavigationRail.Footer>
            </NavigationRail>
        </View>
    );
};

const NavigationRailItem = ({
    id,
    setActiveItem,
    ...rest
}: NavigationRailItemProps & { id: string; setActiveItem: (id: string) => void }) => {
    const onPress = useCallback(() => {
        setActiveItem(id);
    }, [id, setActiveItem]);

    return <NavigationRail.Item {...rest} onPress={onPress} />;
};

export const NavigationRailItemExample = (props: NavigationRailItemProps) => {
    return <NavigationRail.Item {...props} />;
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        _web: {},
    },
    container: {
        height: 500,
    },
    header: {
        paddingVertical: 16,
    },
    menuButton: {
        marginBottom: 12,
    },
});

const routesData = [
    {
        id: '1',
        iconName: 'folder-outline',
        activeIconName: 'folder',
        label: 'All files',
    },
    {
        id: '2',
        iconName: 'clock-time-four-outline',
        activeIconName: 'clock-time-four',
        label: 'Recent',
    },
    {
        id: '3',
        iconName: 'image-outline',
        activeIconName: 'image',
        label: 'Images',
    },
    {
        id: '4',
        iconName: 'music-box-multiple-outline',
        activeIconName: 'music-box-multiple',
        label: 'Library',
    },
];
