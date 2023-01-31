import { DatePickerInline, TimePicker, DatePickerModal, TimePickerModal } from '../src/components';
import { renderWithWrapper } from './testHelpers';

const onChangeMock = jest.fn();
const onDismissMock = jest.fn();
const onConfirmMock = jest.fn();
const onFocusInputMock = jest.fn();

it('renders DatePickerInline component with single mode', () => {
    const tree = renderWithWrapper(
        <DatePickerInline mode="single" date={new Date()} onChange={onChangeMock} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders DatePickerInline component with range mode', () => {
    const tree = renderWithWrapper(
        <DatePickerInline
            mode="range"
            startDate={new Date()}
            endDate={undefined}
            onChange={onChangeMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders DatePickerInline component with multiple mode', () => {
    const tree = renderWithWrapper(
        <DatePickerInline mode="multiple" dates={[new Date()]} onChange={onChangeMock} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders DatePickerModal component with range mode', () => {
    const tree = renderWithWrapper(
        <DatePickerModal
            isOpen={false}
            mode="range"
            startDate={new Date()}
            endDate={undefined}
            onChange={onChangeMock}
            onClose={onDismissMock}
            onConfirm={onConfirmMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

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

it('renders TimePickerModal component with hours value 10 and minutes value 15', () => {
    const tree = renderWithWrapper(
        <TimePickerModal
            isOpen={false}
            time="10:15"
            onConfirm={onConfirmMock}
            onClose={onDismissMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
