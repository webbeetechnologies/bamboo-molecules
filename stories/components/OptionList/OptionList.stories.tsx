import { StyleSheet, View } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { generateSectionListData } from '../../common';

import { Example } from './OptionList';
import { useArgs } from '@storybook/addons';
import { useCallback, useMemo } from 'react';

export default {
    title: 'components/OptionList',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => {
    const [_, updateArgs] = useArgs();

    const records = useMemo(() => {
        return args.records.map(section => ({
            ...section,
            data: section.data.filter(item =>
                item.title.toLowerCase().includes(args.query?.toLowerCase()),
            ),
        }));
    }, [args.query, args.records]);

    const onQueryChange = useCallback(
        (text: string) => {
            updateArgs({ ...args, query: text });
        },
        [args, updateArgs],
    );

    return (
        <View style={styles.container}>
            <Example {...args} records={records} onQueryChange={onQueryChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 300,
        maxHeight: 500,
    },
});

Default.args = {
    searchable: true,
    query: '',
    onQueryChange: () => {},
    records: generateSectionListData(10, 100),
    searchInputProps: {
        label: 'Search . . .',
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

export const Example = () => {
    const { OptionList, ListItem, Text } = useMolecules();
    
    const [query, setQuery] = useState();
    
    const records = useMemo(() => {
        return defaultRecords.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);
    
    const onQueryChange = useCallback((text: string) => {
      setQuery(text);
    }, [setQuery]);
    
    const searchInputProps = useMemo(() => ({
        label: 'Search . . .'
    }), []);

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
        <OptionList 
            records={records}
            renderItem={renderItem} 
            renderSectionHeader={renderSectionHeader} s
            earchable query={query} 
            onQueryChange={onQueryChange} 
            searchInputProps={searchInputProps} />
    );
};

const defaultRecords = [
    {
        id: 0,
        title: "section 0",
        data: [
          { title: "item 0" },
          { title: "item 1" },
          { title: "item 2" },
          { title: "item 3" },
          { title: "item 4" },
          { title: "item 5" },
          { title: "item 6" },
          { title: "item 7" },
          { title: "item 8" },
          // . . .
          ]
    },
      {
          id: 1,
          title: "section 1",
          data: [
              { title: "item 10" },
              { title: "item 11" },
              { title: "item 12" },
              { title: "item 13" },
              { title: "item 14" },
              { title: "item 15" },
              { title: "item 16" },
              { title: "item 17" },
              { title: "item 18" },
            // . . .
            ]
    },
    // . . .
    ]

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        paddingLeft: 'spacings.3',
        backgroundColor: 'colors.surface',
        paddingTop: 'spacings.2',
    },
});
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
