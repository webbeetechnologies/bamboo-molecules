import { Text } from 'react-native';
import { SectionList } from '../src/components/SectionList';
import { renderWithWrapper } from './testHelpers';

const renderItemMock = jest.fn(({ item }) => {
    return <Text>{item.text}</Text>;
});

const renderSectionHeaderMock = jest.fn(({ section }) => {
    return <Text>{section?.title}</Text>;
});

const sections = [
    {
        title: 'Numbers',
        data: [
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
        ],
    },
    {
        title: 'Letters',
        data: [
            {
                text: 'A',
            },
            {
                text: 'B',
            },
            {
                text: 'C',
            },
            {
                text: 'D',
            },
        ],
    },
];

describe('SectionList', () => {
    it('renders SectionsList with just items', () => {
        const tree = renderWithWrapper(
            <SectionList sections={sections} renderItem={renderItemMock} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders SectionsList with section header and items', () => {
        const tree = renderWithWrapper(
            <SectionList
                sections={sections}
                renderSectionHeader={renderSectionHeaderMock}
                renderItem={renderItemMock}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
