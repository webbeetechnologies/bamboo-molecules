import { Text } from 'react-native';
import { Example as FlatList } from '../stories/components/FlatList/FlatList';
import { renderWithWrapper } from '../testHelpers';

const renderItemMock = jest.fn(({ item }) => {
    return <Text>{item.text}</Text>;
});

const items = [
    {
        text: '1',
    },
    {
        text: '2',
    },
    {
        text: '3',
    },
    {
        text: '4',
    },
];

describe('FlatList', () => {
    it('renders FlatList items', () => {
        const tree = renderWithWrapper(
            <FlatList data={items} renderItem={renderItemMock} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
