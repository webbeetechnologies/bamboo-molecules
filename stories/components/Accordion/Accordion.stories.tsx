import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { delay } from '../../common';
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
export const Example = () => {
    const { View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [],
    );

    return (
        <Accordion>
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
export const ExampleControlled = () => {
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
            multiple
            expandedItemIds={expandedItems}
            onChange={onExpandedItemsChange}>
            <AccordionItem
                style={styles.item}
                id="1">
                <AccordionItem.Header
                    left={leftElement}>
                    First Item
                </AccordionItem.Header>
                <AccordionItem.Content>
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
                id="2">
                <AccordionItem.Header left={leftElement}>
                    Second Item
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
export const ExampleNestedAccordion = () => {
    const { View, Text } = useMolecules();

    const leftElement = useCallback(
        ({ expanded, color }: AccordionHeaderElementProps) => (
            <Icon color={color} name={expanded ? 'chevron-up' : 'chevron-down'} size={24} />
        ),
        [],
    );

    return (
        <Accordion>
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
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Controlled.args = {
    testID: 'controlledAccordion',
};

Controlled.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => canvas);

    const accordionItem1Header = await canvas.getByTestId(
        'controlledAccordion-accordionItem-1-header',
    );
    const accordionItem2Header = await canvas.getByTestId(
        'controlledAccordion-accordionItem-2-header',
    );

    await expect(
        canvas.queryByTestId('controlledAccordion-accordionItem-1-content'),
    ).not.toBeInTheDocument();
    await expect(
        canvas.queryByTestId('controlledAccordion-accordionItem-2-content'),
    ).not.toBeInTheDocument();

    await userEvent.click(accordionItem1Header);

    await expect(
        canvas.queryByTestId('controlledAccordion-accordionItem-1-content'),
    ).toBeInTheDocument();

    await userEvent.click(accordionItem2Header);

    await expect(
        canvas.queryByTestId('controlledAccordion-accordionItem-2-content'),
    ).toBeInTheDocument();

    await userEvent.click(accordionItem1Header);
    await userEvent.click(accordionItem2Header);

    await expect(
        canvas.queryByTestId('controlledAccordion-accordionItem-1-content'),
    ).not.toBeInTheDocument();
    await expect(
        canvas.queryByTestId('controlledAccordion-accordionItem-2-content'),
    ).not.toBeInTheDocument();

    // hover test
    const defaultBg = 'rgba(0, 0, 0, 0)';
    const hoverBg = 'rgba(28, 27, 31, 0.08)';

    await expect(window.getComputedStyle(accordionItem1Header).backgroundColor).toBe(defaultBg);
    await expect(window.getComputedStyle(accordionItem2Header).backgroundColor).toBe(defaultBg);

    await userEvent.hover(accordionItem1Header);
    await userEvent.hover(accordionItem2Header);

    await delay(100);

    await expect(window.getComputedStyle(accordionItem1Header).backgroundColor).toBe(hoverBg);
    await expect(window.getComputedStyle(accordionItem2Header).backgroundColor).toBe(hoverBg);

    await userEvent.unhover(accordionItem1Header);
    await userEvent.unhover(accordionItem2Header);

    await delay(100);

    await expect(window.getComputedStyle(accordionItem1Header).backgroundColor).toBe(defaultBg);
    await expect(window.getComputedStyle(accordionItem2Header).backgroundColor).toBe(defaultBg);
};
