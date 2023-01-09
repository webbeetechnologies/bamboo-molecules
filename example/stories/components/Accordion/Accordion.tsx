import { useMolecules, AccordionItemProps } from 'bamboo-molecules';
import { useCallback } from 'react';

export type Props = AccordionItemProps & {};

export const Example = (props: Props) => {
    const { Accordion, AccordionItem, Icon, View, Text } = useMolecules();
    const leftElement = useCallback(
        ({ expanded, color }: any) => (
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
