import { renderWithWrapper } from '../../../../testHelpers';
import { DatePickerModal } from '../index';

const onChangeMock = jest.fn();
const onDismissMock = jest.fn();
const onConfirmMock = jest.fn();

describe('DatePickerModal', () => {
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
});
