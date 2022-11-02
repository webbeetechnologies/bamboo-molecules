import { NumberInputMasks } from 'bamboo-molecules';
import { renderWithWrapper } from '../testHelper';
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

it('should renders correctly with custom mask', () => {
    const tree = renderWithWrapper(
        <NumberInput mask={NumberInputMasks.CREDIT_CARD} onChangeText={mockedOnChangeText} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should renders correctly with custom mask default value', () => {
    const { getByDisplayValue } = renderWithWrapper(
        <NumberInput
            mask={NumberInputMasks.CREDIT_CARD}
            defaultValue="42424242"
            onChangeText={mockedOnChangeText}
        />,
    );
    expect(getByDisplayValue('4242 4242')).toBeTruthy();
});
