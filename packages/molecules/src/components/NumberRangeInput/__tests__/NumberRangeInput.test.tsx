import { renderWithWrapper } from '../../../../testHelpers';
import { NumberRangeInput } from '../index';

const mockedOnChange = jest.fn();
const mockedValue = { min: '10', max: '15' };

describe('NumberRangeInput', () => {
    it('should render correctly with default props', () => {
        const tree = renderWithWrapper(
            <NumberRangeInput value={mockedValue} onChange={mockedOnChange} />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should correctly mask the defaultValue', () => {
        const { getByDisplayValue } = renderWithWrapper(
            <NumberRangeInput value={mockedValue} onChange={mockedOnChange} />,
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
