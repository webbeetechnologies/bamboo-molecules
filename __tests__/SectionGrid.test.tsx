import { Text } from 'react-native';
import { SectionGrid } from '../src/components/SectionGrid';
import { renderWithWrapper } from '../testHelpers';

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

describe('SectionGrid', () => {
    it('renders SectionGrid with Section header, 3 max items per row and spacing of 10', () => {
        const tree = renderWithWrapper(
            <SectionGrid
                sections={sections}
                renderItem={renderItemMock}
                maxItemsPerRow={3}
                renderSectionHeader={renderSectionHeaderMock}
                spacing={10}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
