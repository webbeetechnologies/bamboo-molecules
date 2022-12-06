import { renderWithWrapper } from '../testHelpers';
import { NumberRangeInput } from '../../src/components/NumberRangeInput';

const mockedOnChange = jest.fn();

describe('NumberRangeInput', () => {
    it('should render correctly with default props', () => {
        const tree = renderWithWrapper(<NumberRangeInput />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should correctly mask the defaultValue', () => {
        const { getByDisplayValue } = renderWithWrapper(
            <NumberRangeInput defaultValue={{ min: '10', max: '15' }} />,
        );
        expect(getByDisplayValue('10')).toBeTruthy();
        expect(getByDisplayValue('15')).toBeTruthy();
    });

    it('should correctly work with value and onChange', () => {
        const { getByDisplayValue } = renderWithWrapper(
            <NumberRangeInput value={{ min: '10', max: '15' }} onChange={mockedOnChange} />,
        );
        expect(getByDisplayValue('10')).toBeTruthy();
        expect(getByDisplayValue('15')).toBeTruthy();
    });
});
