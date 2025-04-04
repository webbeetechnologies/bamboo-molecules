import { renderWithWrapper } from '../../../../testHelpers';
import { TimePicker } from '../index';

const onChangeMock = jest.fn();
const onFocusInputMock = jest.fn();

describe('TimePicker', () => {
    it('renders TimePicker component with keyboard mode, hours value 10 and minutes value 15, focused to hours input', () => {
        const tree = renderWithWrapper(
            <TimePicker
                time="10:15"
                focused="hours"
                onTimeChange={onChangeMock}
                inputType={'keyboard'}
                onFocusInput={onFocusInputMock}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders TimePicker component with picker mode, hours value 10 and minutes value 15, focused to minutes input', () => {
        const tree = renderWithWrapper(
            <TimePicker
                time="10:15"
                focused="minutes"
                onTimeChange={onChangeMock}
                inputType={'picker'}
                onFocusInput={onFocusInputMock}
            />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
