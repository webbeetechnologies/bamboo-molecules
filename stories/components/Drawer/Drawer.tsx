import { useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
    Drawer,
    Icon,
    DrawerProps,
    DrawerItemProps,
    DrawerItemElementProps,
    DrawerCollapsibleItemHeaderElementProps,
    DrawerCollapsibleItemProps,
    DrawerItemGroupProps,
} from '../../../src/components';
import { useMolecules } from '../../../src';

export type Props = DrawerProps & DrawerItemProps['left'] & {};

export const Example = (props: Props) => {
    const { Text } = useMolecules();
    const { height } = useWindowDimensions();

    const [activeItem, setActiveItem] = useState(0);

    return (
        <Drawer {...props} style={{ height: height }}>
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
                            [],
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
                            [],
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
                            [],
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
                            [],
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
                            [],
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
                                [],
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
                                    [],
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
                                    [],
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
                                    [],
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
                                    [],
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
};

export const ExampleDrawerItem = (props: DrawerItemProps) => {
    const { Text } = useMolecules();

    return (
        <Drawer.Item
            label="Inbox"
            left={useCallback(
                ({ color }: DrawerItemElementProps) => (
                    <Icon name="inbox" color={color} size={24} />
                ),
                [],
            )}
            right={useCallback(
                ({ color }: DrawerItemElementProps) => (
                    <Text style={{ color }}>24</Text>
                ),
                [Text],
            )}
            {...props}
        />
    );
};

export const ExampleDrawerItemGroup = (props: DrawerItemGroupProps) => {
    const { Text } = useMolecules();

    return (
        <Drawer.ItemGroup {...props}>
            <Drawer.Item
                label="Inbox"
                left={useCallback(
                    ({ color }: DrawerItemElementProps) => (
                        <Icon name="inbox" color={color} size={24} />
                    ),
                    [],
                )}
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
                    [],
                )}
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
                    [],
                )}
            />
            <Drawer.Item
                label="Trash"
                left={useCallback(
                    ({ color }: DrawerItemElementProps) => (
                        <Icon name="delete-outline" color={color} size={24} />
                    ),
                    [],
                )}
            />
        </Drawer.ItemGroup>
    );
};

export const ExampleDrawerCollapsibleItem = (props: DrawerCollapsibleItemProps) => {
    return (
        <Drawer.CollapsibleItem {...props}>
            <Drawer.CollapsibleItem.Header
                testID={`${props.testID || 'drawer-collapsible-item'}-header`}
                left={useCallback(
                    ({ color, expanded }: DrawerCollapsibleItemHeaderElementProps) => (
                        <Icon
                            name={expanded ? 'chevron-up' : 'chevron-down'}
                            color={color}
                            size={24}
                        />
                    ),
                    [],
                )}>
                More
            </Drawer.CollapsibleItem.Header>

            <Drawer.CollapsibleItem.Content
                testID={`${props.testID || 'drawer-collapsible-item'}-content`}>
                <Drawer.Item
                    label="Important"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="label-outline" color={color} size={24} />
                        ),
                        [],
                    )}
                />
                <Drawer.Item
                    label="All mails"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="email-multiple-outline" color={color} size={24} />
                        ),
                        [],
                    )}
                />
                <Drawer.Item
                    label="Spams"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="alert-octagon-outline" color={color} size={24} />
                        ),
                        [],
                    )}
                />
                <Drawer.Item
                    label="Manage labels"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="cog-outline" color={color} size={24} />
                        ),
                        [],
                    )}
                />
            </Drawer.CollapsibleItem.Content>
        </Drawer.CollapsibleItem>
    );
};

const styles = StyleSheet.create({
    header: { height: 100, backgroundColor: '#f5f5f5', padding: 12 },
    footer: { height: 50, padding: 12 },
});
