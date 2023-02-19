import { StyleSheet, View } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { Example } from './OptionFlatList';
import { useArgs } from '@storybook/addons';
import { useCallback, useMemo } from 'react';
import { generateFlatListData } from '../../../__mocks__/generateFlatListData';

export default {
    title: 'components/OptionFlatList',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => {
    const [_, updateArgs] = useArgs();

    const records = useMemo(() => {
        return args.records.filter(item =>
            item.title.toLowerCase().includes(args.query?.toLowerCase()),
        );
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
    records: generateFlatListData(100),
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    ),
    searchInputProps: {
        label: 'Search . . .',
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
import { useState, useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { useMolecules } from '@bulterapp/bamboo-molecules';

export const App = () => {
    const { OptionFlatList, ListItem } = useMolecules();
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
    
    const renderItem = useCallback(({ item }: ListRenderItemInfo) => (
        <ListItem>
            <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem>
    ), [])

    return (
        <OptionFlatList 
            searchable query={query} 
            onQueryChange={onQueryChange} 
            records={records} 
            renderItem={renderItem} 
            searchInputProps={searchInputProps} />
    );
};

const defaultRecords = [
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
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
