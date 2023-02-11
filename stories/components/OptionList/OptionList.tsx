import { useMolecules } from '../../../src';
import { OptionList, ListItem, OptionListProps } from '../../../src/components';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

export type Props = OptionListProps & {};

export const Example = (props: Props) => {
    const { Text } = useMolecules();

    const renderItem = useCallback(
        ({ item }: any) => (
            <ListItem>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem>
        ),
        [],
    );
    const renderSectionHeader = useCallback(
        ({ section }: any) => <Text style={styles.sectionTitle}>{section.title}</Text>,
        [Text],
    );

    return (
        <OptionList renderItem={renderItem} renderSectionHeader={renderSectionHeader} {...props} />
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 'spacings.3',
        backgroundColor: 'colors.surface',
        paddingTop: 'spacings.2',
    },
});
