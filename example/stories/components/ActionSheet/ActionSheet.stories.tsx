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
    gestureEnabled: true,
    snapPoints: [50, 80, 100],
    closable: false,
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
    const { ActionSheet } = useMolecules();
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => { // to display on render
        actionSheetRef.current?.show();
    }, []);

    return (
        <ActionSheet gestureEnabled={true} snapPoints={[50, 80, 100]} closable={false} ref={actionSheetRef}>
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
