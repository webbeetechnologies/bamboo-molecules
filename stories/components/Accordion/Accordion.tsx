import { AccordionProps, AccordionHeaderElementProps, useMolecules } from '../../../src';
import { Accordion, AccordionItem, Icon } from '../../../src/components';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

export type Props = AccordionProps & {};

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [],
    );

    return (
        <Accordion {...props}>
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
};

export const ExampleControlled = (props: Props) => {
    const { View, Text } = useMolecules();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [],
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
                style={styles.item}
                id="1"
                testID={`${props.testID || ''}-accordionItem-1`}>
                <AccordionItem.Header
                    left={leftElement}
                    testID={`${props.testID || ''}-accordionItem-1-header`}>
                    First Item
                </AccordionItem.Header>
                <AccordionItem.Content testID={`${props.testID || ''}-accordionItem-1-content`}>
                    <View style={styles.item}>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                            temporibus ut vero. Ducimus
                        </Text>
                    </View>
                </AccordionItem.Content>
            </AccordionItem>
            <AccordionItem
                style={styles.item}
                id="2"
                testID={`${props.testID || ''}-accordionItem-2`}>
                <AccordionItem.Header
                    left={leftElement}
                    testID={`${props.testID || ''}-accordionItem-2-header`}>
                    Second Item
                </AccordionItem.Header>
                <AccordionItem.Content testID={`${props.testID || ''}-accordionItem-2-content`}>
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
};

export const ExampleNestedAccordion = (props: Props) => {
    const { View, Text } = useMolecules();

    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [],
    );

    return (
        <Accordion {...props}>
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
};

const styles = StyleSheet.create({
    item: {
        width: 400,
    },
    content: {
        padding: 'spacings.4',
    },
    text: {
        fontSize: 16,
    },
});
