import { renderWithWrapper } from '../testHelpers';
import { NumberInput } from '../../src/components/NumberInput';

const mockedOnChangeText = jest.fn();

it('should render correctly with the default mask', () => {
    const tree = renderWithWrapper(
        <NumberInput
            value="with space and special* characters;"
            onChangeText={mockedOnChangeText}
        />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should correctly mask default value', () => {
    const { getByDisplayValue } = renderWithWrapper(
        <NumberInput defaultValue="-123.22abc" onChangeText={mockedOnChangeText} />,
    );
    expect(getByDisplayValue('-123.22')).toBeTruthy();
});
