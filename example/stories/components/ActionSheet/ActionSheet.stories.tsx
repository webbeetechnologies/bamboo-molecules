import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleWithTrigger } from './ActionSheet';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';
import { Example as Icon } from '../Icon/Icon';

export default {
    title: 'components/ActionSheet',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    isOpen: true,
    gestureEnabled: true,
    snapPoints: [50, 80, 100],
    children: (
        <>
            <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                <ListItemTitle>First Item</ListItemTitle>
            </ListItem>
            <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                <ListItemTitle>Second Item</ListItemTitle>
            </ListItem>
            <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                <ListItemTitle>Third Item</ListItemTitle>
            </ListItem>
        </>
    ),
    onChange: () => {}, // to disabled storybook actions mock
    onOpen: () => {},
    onClose: () => {},
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { ActionSheet, Button } = useMolecules();
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Button onPress={onOpen}>Show Action Sheet</Button>
            <ActionSheet {...props} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const UsageWithTrigger: ComponentStory<typeof Example> = args => (
    <ExampleWithTrigger {...args} />
);

UsageWithTrigger.args = {
    ...Default.args,
    closable: true,
};

UsageWithTrigger.parameters = {
    docs: {
        source: {
            code: `
    const { ActionSheet, Button } = useMolecules();
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const onOpen = () => {
        actionSheetRef.current?.show();
    };

    return (
        <>
            <Button onPress={onOpen}>Show Action Sheet</Button>
            <ActionSheet gestureEnabled={true} snapPoints={[50, 80, 100]} ref={actionSheetRef}>
                <>
                    <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                        <ListItemTitle>First Item</ListItemTitle>
                    </ListItem>
                    <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                        <ListItemTitle>Second Item</ListItemTitle>
                    </ListItem>
                    <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                        <ListItemTitle>Third Item</ListItemTitle>
                    </ListItem>
                </>
            </ActionSheet>
        </>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
