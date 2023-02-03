import { renderWithWrapper } from '../../../../testHelpers';
import { TimePickerModal } from '../index';

const onDismissMock = jest.fn();
const onConfirmMock = jest.fn();

describe('TimePickerModal', () => {
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
});
