import { useMolecules, AccordionProps, AccordionHeaderElementProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = AccordionProps & {};

export const Example = (props: Props) => {
    const { Accordion, AccordionItem, Icon, View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [Icon],
    );

    return (
        <Accordion {...props}>
            <AccordionItem style={{ width: 400 }} id="1">
                <AccordionItem.Header left={leftElement}>First Item</AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={{ padding: 'spacings.4' }}>
                        <Text style={{ fontSize: 16 }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem style={{ width: 400 }} id="2">
                <AccordionItem.Header left={leftElement}>Second Item</AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={{ padding: 'spacings.4' }}>
                        <Text style={{ fontSize: 16 }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
        </Accordion>
    );
};

export const ExampleControlled = (props: Props) => {
    const { Accordion, AccordionItem, Icon, View, Text } = useMolecules();
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
        <Accordion
            {...props}
            multiple
            expandedItemIds={expandedItems}
            onChange={onExpandedItemsChange}>
            <AccordionItem
                style={{ width: 400 }}
                id="1"
                testID={`${props.testID || ''}-accordionItem-1`}>
                <AccordionItem.Header
                    left={leftElement}
                    testID={`${props.testID || ''}-accordionItem-1-header`}>
                    First Item
                </AccordionItem.Header>
                <AccordionItem.Content testID={`${props.testID || ''}-accordionItem-1-content`}>
                    <View style={{ padding: 'spacings.4' }}>
                        <Text style={{ fontSize: 16 }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem
                style={{ width: 400 }}
                id="2"
                testID={`${props.testID || ''}-accordionItem-2`}>
                <AccordionItem.Header
                    left={leftElement}
                    testID={`${props.testID || ''}-accordionItem-2-header`}>
                    Second Item
                </AccordionItem.Header>
                <AccordionItem.Content testID={`${props.testID || ''}-accordionItem-2-content`}>
                    <View style={{ padding: 'spacings.4' }}>
                        <Text style={{ fontSize: 16 }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
        </Accordion>
    );
};

export const ExampleNestedAccordion = (props: Props) => {
    const { Accordion, AccordionItem, Icon, View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [Icon],
    );

    return (
        <Accordion {...props}>
            <AccordionItem style={{ width: 400 }} id="1">
                <AccordionItem.Header left={leftElement}>
                    Accordion (Accordion Group)
                </AccordionItem.Header>
                <AccordionItem.Content>
                    <View style={{ padding: 'spacings.4' }}>
                        <Text style={{ fontSize: 16 }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem style={{ width: 400 }} id="2">
                <AccordionItem.Header left={leftElement}>AccordionItem</AccordionItem.Header>
                <AccordionItem.Content>
                    <Accordion multiple>
                        <AccordionItem style={{ width: 400 }} id="1">
                            <AccordionItem.Header left={leftElement}>
                                Accordion Header
                            </AccordionItem.Header>
                            <AccordionItem.Content>
                                <View style={{ padding: 'spacings.4' }}>
                                    <Text style={{ fontSize: 16 }}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Atque temporibus ut vero. Ducimus
                                    </Text>
                                </View>
                            </AccordionItem.Content>
                        </AccordionItem>
                        <AccordionItem style={{ width: 400 }} id="2">
                            <AccordionItem.Header left={leftElement}>
                                Accordion Content
                            </AccordionItem.Header>
                            <AccordionItem.Content>
                                <View style={{ padding: 'spacings.4' }}>
                                    <Text style={{ fontSize: 16 }}>
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
};
