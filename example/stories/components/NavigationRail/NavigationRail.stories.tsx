import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, NavigationRailItemExample } from './NavigationRail';

export default {
    title: 'components/NavigationRail',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
export const NavigationRailExample = (props: Props) => {
    const { NavigationRail, Text, FAB, IconButton } = useMolecules();
    const [activeItem, setActiveItem] = useState('');
    
    const onPressMenu = useCallback(() => {}, []);
    const onPressFAB = useCallback(() => {}, []);

    return (
        <NavigationRail style={styles.container} {...props}>
            <NavigationRail.Header style={styles.header}>
                <IconButton name="menu" size={24} onPress={() => {}} style={styles.menuButton} />
                <FAB iconName="pencil-outline" onPress={() => {}} elevation={0} />
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
    );
};

const NavigationRailItem = ({
    id,
    setActiveItem,
    ...rest
}: NavigationRailItemProps & { id: string; setActiveItem: (id: string) => void }) => {
    const { NavigationRail } = useMolecules();

    const onPress = useCallback(() => {
        setActiveItem(id);
    }, [id, setActiveItem]);

    return <NavigationRail.Item {...rest} onPress={onPress} />;
};

const styles = StyleSheet.create({
    container: {
        height: 500,
    },
    header: {
        paddingVertical: 'spacings.4',
    },
    menuButton: {
        marginBottom: 'spacings.3',
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
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const NavigationRailItem: ComponentStory<typeof NavigationRailItemExample> = args => (
    <NavigationRailItemExample {...args} />
);

NavigationRailItem.args = {
    iconName: 'circle-outline',
    activeIconName: 'circle',
    label: 'Label',
    active: false,
    showBadge: true,
    badgeLabel: '10',
};

NavigationRailItem.parameters = {
    docs: {
        source: {
            code: `
            
    const { NavigationRail } = useMolecules();

    return <NavigationRail.Item iconName="circle-outline" activeIconName="circle" label="Label" active={false} showBadge={true} badgeLabel="10" />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
