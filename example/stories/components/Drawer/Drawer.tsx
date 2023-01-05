import { useMolecules, DrawerProps } from 'bamboo-molecules';
import { StyleSheet, Text, TextStyle, useWindowDimensions } from 'react-native';
import { useState } from 'react';

export type Props = DrawerProps & {};

export const Example = (props: Props) => {
    const { Drawer, Icon, HorizontalDivider } = useMolecules();
    const { height } = useWindowDimensions();

    const [activeItem, setActiveItem] = useState(0);

    return (
        <Drawer {...props} style={{ height: height }}>
            <Drawer.Header style={{ height: 100, backgroundColor: '#f5f5f5', padding: 12 }}>
                <Text>Header</Text>
            </Drawer.Header>
            <Drawer.Content>
                <Text style={styles.sectionHeadline}>Mail</Text>
                <Drawer.Item
                    label="Inbox"
                    left={<Icon name="inbox" size={24} />}
                    active={activeItem === 0}
                    onPress={() => setActiveItem(0)}
                    right={<Text>24</Text>}
                />

                <Drawer.Item
                    label="Outbox"
                    left={<Icon name="send-outline" size={24} />}
                    active={activeItem === 1}
                    onPress={() => setActiveItem(1)}
                    right={<Text>100+</Text>}
                />
                <Drawer.Item
                    label="Favorites"
                    left={<Icon name="heart-outline" size={24} />}
                    active={activeItem === 2}
                    onPress={() => setActiveItem(2)}
                />
                <Drawer.Item
                    label="Trash"
                    left={<Icon name="delete-outline" size={24} />}
                    active={activeItem === 3}
                    onPress={() => setActiveItem(3)}
                />
                <HorizontalDivider spacing={4} />
                <Text style={styles.sectionHeadline}>Labels</Text>
                <Drawer.Item
                    label="Inbox"
                    left={<Icon name="inbox" size={24} />}
                    active={activeItem === 4}
                    onPress={() => setActiveItem(4)}
                />

                <Drawer.Item
                    label="Outbox"
                    left={<Icon name="send-outline" size={24} />}
                    active={activeItem === 5}
                    onPress={() => setActiveItem(5)}
                />
                <Drawer.Item
                    label="Favorites"
                    left={<Icon name="heart-outline" size={24} />}
                    active={activeItem === 6}
                    onPress={() => setActiveItem(6)}
                />
                <Drawer.Item
                    label="Trash"
                    left={<Icon name="delete-outline" size={24} />}
                    active={activeItem === 7}
                    onPress={() => setActiveItem(7)}
                />
            </Drawer.Content>
            <Drawer.Footer style={{ height: 50, padding: 12 }}>
                <Text>Footer</Text>
            </Drawer.Footer>
        </Drawer>
    );
};

const styles = StyleSheet.create({
    sectionHeadline: {
        color: 'colors.onSurfaceVariant',
        lineHeight: 'typescale.titleSmall.lineHeight' as unknown as number,
        fontSize: 'typescale.titleSmall.fontSize' as unknown as number,
        fontWeight: 'typescale.titleSmall.fontWeight' as unknown as TextStyle['fontWeight'],
        marginVertical: 16,
        marginHorizontal: 12,
    },
});
