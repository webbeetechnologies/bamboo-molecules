import { Text } from 'react-native';
import { FlatGrid } from '../../index';
import { renderWithWrapper } from '../../../../testHelpers';

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

describe('FlatGrid', () => {
    it('renders FlatGrid items with itemDimension 100 and spacing 10', () => {
        const tree = renderWithWrapper(
            <FlatGrid data={items} renderItem={renderItemMock} itemDimension={100} spacing={10} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
