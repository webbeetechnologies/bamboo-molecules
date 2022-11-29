import { Example as OptionList } from '../stories/components/OptionList/OptionList';
import { renderWithWrapper } from '../testHelpers';

const onQueryChangeMock = jest.fn();
const onSelectItemChangeMock = jest.fn();
const records = [
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

describe('OptionList', () => {
    it('renders default OptionList with records', () => {
        const tree = renderWithWrapper(<OptionList records={records} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders OptionList with SearchField', () => {
        const tree = renderWithWrapper(
            <OptionList searchable onQueryChange={onQueryChangeMock} records={records} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders OptionList with selectable items', () => {
        const tree = renderWithWrapper(
            <OptionList records={records} selectable onSelectItemChange={onSelectItemChangeMock} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
