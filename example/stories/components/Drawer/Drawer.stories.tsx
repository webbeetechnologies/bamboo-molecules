import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Drawer';

export default {
    title: 'components/Drawer',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { Drawer, Text, Icon } = useMolecules();

    const [activeItem, setActiveItem] = useState(0);

     return (
        <Drawer style={styles.drawer}>
            <Drawer.Header style={styles.header}>
                <Text>Header</Text>
            </Drawer.Header>
            <Drawer.Content>
                <Drawer.ItemGroup title="Mail" showDivider>
                    <Drawer.Item
                        label="Inbox"
                        left={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Icon name="inbox" color={color} size={24} />
                            ),
                            [Icon],
                        )}
                        active={activeItem === 0}
                        onPress={useCallback(() => setActiveItem(0), [])}
                        right={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Text style={{ color }}>24</Text>
                            ),
                            [Text],
                        )}
                    />

                    <Drawer.Item
                        label="Outbox"
                        left={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Icon name="send-outline" color={color} size={24} />
                            ),
                            [Icon],
                        )}
                        active={activeItem === 1}
                        onPress={useCallback(() => setActiveItem(1), [])}
                        right={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Text style={{ color }}>100+</Text>
                            ),
                            [Text],
                        )}
                    />
                    <Drawer.Item
                        label="Favorites"
                        left={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Icon name="heart-outline" color={color} size={24} />
                            ),
                            [Icon],
                        )}
                        active={activeItem === 2}
                        onPress={useCallback(() => setActiveItem(2), [])}
                    />
                    <Drawer.Item
                        label="Trash"
                        left={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Icon name="delete-outline" color={color} size={24} />
                            ),
                            [Icon],
                        )}
                        active={activeItem === 3}
                        onPress={useCallback(() => setActiveItem(3), [])}
                    />
                </Drawer.ItemGroup>
                <Drawer.ItemGroup title="Labels" showDivider>
                    <Drawer.Item
                        label="Inbox"
                        left={useCallback(
                            ({ color }: DrawerItemElementProps) => (
                                <Icon name="inbox" color={color} size={24} />
                            ),
                            [Icon],
                        )}
                        active={activeItem === 4}
                        onPress={useCallback(() => setActiveItem(4), [])}
                    />

                    <Drawer.CollapsibleItem active={[5, 6, 7, 8].includes(activeItem)}>
                        <Drawer.CollapsibleItem.Header
                            left={useCallback(
                                ({ color, expanded }: DrawerCollapsibleItemHeaderElementProps) => (
                                    <Icon
                                        name={expanded ? 'chevron-up' : 'chevron-down'}
                                        color={color}
                                        size={24}
                                    />
                                ),
                                [Icon],
                            )}>
                            More
                        </Drawer.CollapsibleItem.Header>
                        <Drawer.CollapsibleItem.Content>
                            <Drawer.Item
                                label="Important"
                                left={useCallback(
                                    ({ color }: DrawerItemElementProps) => (
                                        <Icon name="label-outline" color={color} size={24} />
                                    ),
                                    [Icon],
                                )}
                                active={activeItem === 5}
                                onPress={useCallback(() => setActiveItem(5), [])}
                            />
                            <Drawer.Item
                                label="All mails"
                                left={useCallback(
                                    ({ color }: DrawerItemElementProps) => (
                                        <Icon
                                            name="email-multiple-outline"
                                            color={color}
                                            size={24}
                                        />
                                    ),
                                    [Icon],
                                )}
                                active={activeItem === 6}
                                onPress={useCallback(() => setActiveItem(6), [])}
                            />
                            <Drawer.Item
                                label="Spams"
                                left={useCallback(
                                    ({ color }: DrawerItemElementProps) => (
                                        <Icon
                                            name="alert-octagon-outline"
                                            color={color}
                                            size={24}
                                        />
                                    ),
                                    [Icon],
                                )}
                                active={activeItem === 7}
                                onPress={useCallback(() => setActiveItem(7), [])}
                            />
                            <Drawer.Item
                                label="Manage labels"
                                left={useCallback(
                                    ({ color }: DrawerItemElementProps) => (
                                        <Icon name="cog-outline" color={color} size={24} />
                                    ),
                                    [Icon],
                                )}
                                active={activeItem === 8}
                                onPress={useCallback(() => setActiveItem(8), [])}
                            />
                        </Drawer.CollapsibleItem.Content>
                    </Drawer.CollapsibleItem>
                </Drawer.ItemGroup>
            </Drawer.Content>
            <Drawer.Footer style={styles.footer}>
                <Text>Footer</Text>
            </Drawer.Footer>
        </Drawer>
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};
