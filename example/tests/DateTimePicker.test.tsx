import { Example as DatePickerInline } from '../stories/components/DatePickerInline/DatePickerInline';
import { Example as DatePickerModal } from '../stories/components/DatePickerModal/DatePickerModal';
import { Example as TimePicker } from '../stories/components/TimePicker/TimePicker';
import { Example as TimePickerModal } from '../stories/components/TimePickerModal/TimePickerModal';
import { renderWithWrapper } from '../testHelper';

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
            visible={false}
            mode="range"
            startDate={new Date()}
            endDate={undefined}
            onChange={onChangeMock}
            onDismiss={onDismissMock}
            onConfirm={onConfirmMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders TimePicker component with keyboard mode, hours value 10 and minutes value 15, focused to hours input', () => {
    const tree = renderWithWrapper(
        <TimePicker
            hours={10}
            minutes={15}
            focused="hours"
            onChange={onChangeMock}
            inputType={'keyboard'}
            onFocusInput={onFocusInputMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders TimePicker component with picker mode, hours value 10 and minutes value 15, focused to minutes input', () => {
    const tree = renderWithWrapper(
        <TimePicker
            hours={10}
            minutes={15}
            focused="minutes"
            onChange={onChangeMock}
            inputType={'picker'}
            onFocusInput={onFocusInputMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders TimePickerModal component with hours value 10 and minutes value 15', () => {
    const tree = renderWithWrapper(
        <TimePickerModal
            visible={false}
            hours={10}
            minutes={15}
            onConfirm={onConfirmMock}
            onDismiss={onDismissMock}
        />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
