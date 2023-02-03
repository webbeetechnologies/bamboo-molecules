import { Text } from 'react-native';
import { OptionList } from '../src/components/OptionList';
import { renderWithWrapper } from '../testHelpers';

const renderItemMock = jest.fn(({ item }) => {
    return <Text>{item.text}</Text>;
});
const onQueryChangeMock = jest.fn();
const onSelectItemChangeMock = jest.fn();
const records = [
    {
        title: 'Numbers',
        data: [
            {
                id: '1',
                text: '1',
            },
            {
                id: '2',
                text: '2',
            },
            {
                id: '3',
                text: '3',
            },
            {
                id: '4',
                text: '4',
            },
        ],
    },
    {
        title: 'Letters',
        data: [
            {
                id: 'A',
                text: 'A',
            },
            {
                id: 'B',
                text: 'B',
            },
            {
                id: 'C',
                text: 'C',
            },
            {
                id: 'D',
                text: 'D',
            },
        ],
    },
];

describe('OptionList', () => {
    it('renders default OptionList with records', () => {
        const tree = renderWithWrapper(
            <OptionList records={records} renderItem={renderItemMock} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders OptionList with SearchField', () => {
        const tree = renderWithWrapper(
            <OptionList
                searchable
                onQueryChange={onQueryChangeMock}
                records={records}
                renderItem={renderItemMock}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders OptionList with selectable items', () => {
        const tree = renderWithWrapper(
            <OptionList
                records={records}
                renderItem={renderItemMock}
                selectable
                // @ts-ignore
                onSelectItemChange={onSelectItemChangeMock}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
