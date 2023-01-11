import { useState } from 'react';
import { Text, useWindowDimensions } from 'react-native';
import { useMolecules, DrawerProps, DrawerItemProps } from 'bamboo-molecules';

export type Props = DrawerProps & DrawerItemProps['left'] & {};

export const Example = (props: Props) => {
    const { Drawer, Icon } = useMolecules();
    const { height } = useWindowDimensions();

    const [activeItem, setActiveItem] = useState(0);

    return (
        <Drawer {...props} style={{ height: height }}>
            <Drawer.Header style={{ height: 100, backgroundColor: '#f5f5f5', padding: 12 }}>
                <Text>Header</Text>
            </Drawer.Header>
            <Drawer.Content>
                <Drawer.ItemGroup title="Mail" showDivider>
                    <Drawer.Item
                        label="Inbox"
                        left={({ color }) => <Icon name="inbox" color={color} size={24} />}
                        active={activeItem === 0}
                        onPress={() => setActiveItem(0)}
                        right={({ color }) => <Text style={{ color }}>24</Text>}
                    />

                    <Drawer.Item
                        label="Outbox"
                        left={({ color }) => <Icon name="send-outline" color={color} size={24} />}
                        active={activeItem === 1}
                        onPress={() => setActiveItem(1)}
                        right={({ color }) => <Text style={{ color }}>100+</Text>}
                    />
                    <Drawer.Item
                        label="Favorites"
                        left={({ color }) => <Icon name="heart-outline" color={color} size={24} />}
                        active={activeItem === 2}
                        onPress={() => setActiveItem(2)}
                    />
                    <Drawer.Item
                        label="Trash"
                        left={({ color }) => <Icon name="delete-outline" color={color} size={24} />}
                        active={activeItem === 3}
                        onPress={() => setActiveItem(3)}
                    />
                </Drawer.ItemGroup>
                <Drawer.ItemGroup title="Labels" showDivider>
                    <Drawer.Item
                        label="Inbox"
                        left={({ color }) => <Icon name="inbox" color={color} size={24} />}
                        active={activeItem === 4}
                        onPress={() => setActiveItem(4)}
                    />

                    <Drawer.Item
                        label="Outbox"
                        left={({ color }) => <Icon name="send-outline" color={color} size={24} />}
                        active={activeItem === 5}
                        onPress={() => setActiveItem(5)}
                    />
                    <Drawer.Item
                        label="Favorites"
                        left={({ color }) => <Icon name="heart-outline" color={color} size={24} />}
                        active={activeItem === 6}
                        onPress={() => setActiveItem(6)}
                    />
                    <Drawer.Item
                        label="Trash"
                        left={({ color }) => <Icon name="delete-outline" color={color} size={24} />}
                        active={activeItem === 7}
                        onPress={() => setActiveItem(7)}
                    />
                </Drawer.ItemGroup>
            </Drawer.Content>
            <Drawer.Footer style={{ height: 50, padding: 12 }}>
                <Text>Footer</Text>
            </Drawer.Footer>
        </Drawer>
    );
};
