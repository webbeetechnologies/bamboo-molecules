import { Dimensions, Text } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { ExampleWithToggle } from './DropdownList';

export default {
    title: 'components/DropdownList',
    component: ExampleWithToggle,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof ExampleWithToggle>;

export const Default: ComponentStory<typeof ExampleWithToggle> = args => (
    <ExampleWithToggle {...args} />
);

Default.args = {
    contentContainerStyle: {
        maxHeight: Dimensions.get('screen').height / 2,
    },
    searchable: true,
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    ),
    renderSectionHeader: ({ section }: any) => (
        <Text
            style={{
                fontSize: 16,
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: 4,
                fontWeight: '600',
            }}>
            {section.title.toUpperCase()}
        </Text>
    ),
    actionSheetProps: {
        gestureEnabled: true,
        snapPoints: [30, 50, 100],
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { DropdownList, Button } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle, setState: setIsOpen } = useToggle();
    const [query, onQueryChange] = useState('');
    const sectionListData = useRef(generateSectionListData(10, 100)).current;
    const [records, setRecords] = useState(sectionListData);

    const onSearch = useCallback(
        (newQuery: string) => {
            onQueryChange(newQuery);

            setRecords(
                sectionListData
                    .map(section => ({
                        ...section,
                        data: section.data.filter(item => item.title.includes(newQuery)),
                    }))
                    .filter(section => section.data.length > 0),
            );
        },
        [sectionListData],
    );

    return (
        <>
            <Button ref={triggerRef} onPress={onToggle}>
                Toggle DropdownList
            </Button>
            <DropdownList
                records={records}
                searchable
                query={query}
                onQueryChange={onSearch}
                triggerRef={triggerRef}
                isOpen={isOpen}
                searchInputProps={searchInputProps}
                setIsOpen={setIsOpen}
            />
        </>
    );`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
