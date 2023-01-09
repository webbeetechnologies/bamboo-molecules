import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleControlled, ExampleNestedAccordion } from './Accordion';

export default {
    title: 'components/Accordion',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    multiple: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { Accordion, AccordionItem, Icon, View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [Icon],
    );

    return (
        <Accordion multiple>
            <AccordionItem style={styles.item} id="1">
                <AccordionItem.Header left={leftElement}>First Item</AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem style={styles.item} id="2">
                <AccordionItem.Header left={leftElement}>Second Item</AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
        </Accordion>
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Controlled: ComponentStory<typeof ExampleControlled> = args => (
    <ExampleControlled {...args} />
);

Controlled.args = {};

Controlled.parameters = {
    controls: {
        exclude: ['multiple', 'expandedItems', 'onChange'],
    },
    docs: {
        source: {
            code: `
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [Icon],
    );

    const onExpandedItemsChange = useCallback(
        (ids: string | string[]) => setExpandedItems(ids as string[]),
        [],
    );

    return (
        <Accordion multiple expandedItemIds={expandedItems} onChange={onExpandedItemsChange}>
            <AccordionItem style={styles.item} id="1">
                <AccordionItem.Header left={leftElement}>First Item</AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem style={styles.item} id="2">
                <AccordionItem.Header left={leftElement}>Second Item</AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
        </Accordion>
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const NestedAccordion: ComponentStory<typeof ExampleNestedAccordion> = args => (
    <ExampleNestedAccordion {...args} />
);

NestedAccordion.args = {
    multiple: true,
};

NestedAccordion.parameters = {
    docs: {
        source: {
            code: `
            const { Accordion, AccordionItem, Icon, View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [Icon],
    );

    return (
        <Accordion multiple>
            <AccordionItem style={styles.item} id="1">
                <AccordionItem.Header left={leftElement}>
                    Accordion (Accordion Group)
                </AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={styles.content}>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem style={styles.item} id="2">
                <AccordionItem.Header left={leftElement}>AccordionItem</AccordionItem.Header>
                <AccordionItem.Content>
                    <Accordion multiple>
                        <AccordionItem style={styles.item} id="1">
                            <AccordionItem.Header left={leftElement}>
                                Accordion Header
                            </AccordionItem.Header>
                            <AccordionItem.Content>
                                <View style={styles.content}>
                                    <Text style={styles.text}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Atque temporibus ut vero. Ducimus
                                    </Text>
                                </View>
                            </AccordionItem.Content>
                        </AccordionItem>
                        <AccordionItem style={styles.item} id="2">
                            <AccordionItem.Header left={leftElement}>
                                Accordion Content
                            </AccordionItem.Header>
                            <AccordionItem.Content>
                                <View style={styles.content}>
                                    <Text style={styles.text}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Atque temporibus ut vero. Ducimus
                                    </Text>
                                </View>
                            </AccordionItem.Content>
                        </AccordionItem>
                    </Accordion>
                </AccordionItem.Content>
            </AccordionItem>
        </Accordion>
    );
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};
