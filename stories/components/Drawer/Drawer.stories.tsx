import type { ComponentMeta, ComponentStory } from '@storybook/react';

import {
    Example,
    ExampleDrawerCollapsibleItem,
    ExampleDrawerItem,
    ExampleDrawerItemGroup,
} from './Drawer';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useArgs } from '@storybook/addons';
import { delay } from '../../common';

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

export const DrawerItem: ComponentStory<typeof ExampleDrawerItem> = args => {
    const [_, updateArgs] = useArgs();

    return (
        <ExampleDrawerItem
            {...args}
            onPress={() => updateArgs({ ...args, active: !args.active })}
        />
    );
};

DrawerItem.args = {
    label: 'Inbox',
    active: false,
    style: {
        minWidth: 300,
    },
    testID: 'drawer-item',
};

DrawerItem.parameters = {
    docs: {
        source: {
            code: `
    const { Drawer, Icon, Text } = useMolecules();

    return (
        <Drawer.Item
            left={useCallback(
                ({ color }: DrawerItemElementProps) => (
                    <Icon name="inbox" color={color} size={24} />
                ),
                [Icon],
            )}
            right={useCallback(
                ({ color }: DrawerItemElementProps) => (
                    <Text style={{ color }}>24</Text>
                ),
                [Text],
            )}
        />
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const DrawerItemGroup: ComponentStory<typeof ExampleDrawerItemGroup> = args => (
    <ExampleDrawerItemGroup {...args} />
);

DrawerItemGroup.args = {
    title: 'Mail',
    showDivider: true,
    style: {
        minWidth: 300,
    },
};

DrawerItemGroup.parameters = {
    docs: {
        source: {
            code: `
    const { Drawer, Icon, Text } = useMolecules();

    return (
        <Drawer.ItemGroup {...props}>
            <Drawer.Item
                label="Inbox"
                left={useCallback(
                    ({ color }: DrawerItemElementProps) => (
                        <Icon name="inbox" color={color} size={24} />
                    ),
                    [Icon],
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
                    [Icon],
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
                    [Icon],
                )}
            />
            <Drawer.Item
                label="Trash"
                left={useCallback(
                    ({ color }: DrawerItemElementProps) => (
                        <Icon name="delete-outline" color={color} size={24} />
                    ),
                    [Icon],
                )}
            />
        </Drawer.ItemGroup>
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const DrawerCollapsibleItem: ComponentStory<typeof ExampleDrawerCollapsibleItem> = args => (
    <ExampleDrawerCollapsibleItem {...args} />
);

DrawerCollapsibleItem.args = {
    active: false,
    style: {
        minWidth: 300,
    },
    testID: 'drawer-collapsible-item',
};

DrawerCollapsibleItem.parameters = {
    docs: {
        source: {
            code: `
    const { Drawer, Icon } = useMolecules();

    return (
        <Drawer.CollapsibleItem {...props}>
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
                />
                <Drawer.Item
                    label="All mails"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="email-multiple-outline" color={color} size={24} />
                        ),
                        [Icon],
                    )}
                />
                <Drawer.Item
                    label="Spams"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="alert-octagon-outline" color={color} size={24} />
                        ),
                        [Icon],
                    )}
                />
                <Drawer.Item
                    label="Manage labels"
                    left={useCallback(
                        ({ color }: DrawerItemElementProps) => (
                            <Icon name="cog-outline" color={color} size={24} />
                        ),
                        [Icon],
                    )}
                />
            </Drawer.CollapsibleItem.Content>
        </Drawer.CollapsibleItem>
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

DrawerItem.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => canvas);

    const drawerItem = await canvas.getByTestId('drawer-item');

    // hover test
    const defaultBg = 'rgba(0, 0, 0, 0)';
    const hoverBg = 'rgba(28, 27, 31, 0.08)';
    const activeBg = 'rgb(232, 222, 248)';

    await expect(window.getComputedStyle(drawerItem).backgroundColor).toBe(defaultBg);

    await delay(100);

    await userEvent.hover(drawerItem);

    await delay(100);

    await expect(window.getComputedStyle(drawerItem).backgroundColor).toBe(hoverBg);

    await userEvent.unhover(drawerItem);

    await delay(100);

    await expect(window.getComputedStyle(drawerItem).backgroundColor).toBe(defaultBg);

    // click interaction test with active prop

    await userEvent.click(drawerItem);

    await delay(100);

    await expect(window.getComputedStyle(drawerItem).backgroundColor).toBe(activeBg);

    await userEvent.click(drawerItem);
    await userEvent.unhover(drawerItem);

    await delay(100);

    await expect(window.getComputedStyle(drawerItem).backgroundColor).toBe(defaultBg);
};

// DrawerCollapsibleItem.play = async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//
//     await waitFor(() => canvas);
//
//     const drawerCollapsibleItemHeader = await canvas.getByTestId('drawer-collapsible-item-header');
//
//     // hover test
//     const defaultBg = 'rgba(0, 0, 0, 0)';
//     const hoverBg = 'rgba(28, 27, 31, 0.08)';
//
//     await delay(100);
//
//     await expect(window.getComputedStyle(drawerCollapsibleItemHeader).backgroundColor).toBe(
//         defaultBg,
//     );
//
//     await delay(100);
//
//     await userEvent.hover(drawerCollapsibleItemHeader);
//
//     await delay(100);
//
//     await expect(window.getComputedStyle(drawerCollapsibleItemHeader).backgroundColor).toBe(
//         hoverBg,
//     );
//
//     await userEvent.unhover(drawerCollapsibleItemHeader);
//
//     await delay(100);
//
//     await expect(window.getComputedStyle(drawerCollapsibleItemHeader).backgroundColor).toBe(
//         defaultBg,
//     );
//
//     // click interaction test with active prop
//     await userEvent.click(drawerCollapsibleItemHeader);
//
//     await delay(100);
//
//     await expect(canvas.queryByTestId('drawer-collapsible-item-content')).toBeInTheDocument();
//     await expect(canvas.getByText('Important')).toBeInTheDocument();
//     await expect(canvas.getByText('All mails')).toBeInTheDocument();
//     await expect(canvas.getByText('Spams')).toBeInTheDocument();
//     await expect(canvas.getByText('Manage labels')).toBeInTheDocument();
//
//     await userEvent.click(drawerCollapsibleItemHeader);
//     await userEvent.unhover(drawerCollapsibleItemHeader);
//
//     await delay(100);
//
//     await expect(window.getComputedStyle(drawerCollapsibleItemHeader).backgroundColor).toBe(
//         defaultBg,
//     );
//     await expect(canvas.queryByTestId('drawer-collapsible-item-content')).toBeNull();
//     await expect(canvas.queryByTestId('Important')).toBeNull();
//     await expect(canvas.queryByTestId('All mails')).toBeNull();
//     await expect(canvas.queryByTestId('Spams')).toBeNull();
//     await expect(canvas.queryByTestId('Manage labels')).toBeNull();
// };
