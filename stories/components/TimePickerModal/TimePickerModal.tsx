import { TimePickerModal, TimePickerModalProps } from '../../../src/components';

export type Props = TimePickerModalProps & {};

export const Example = (props: Props) => {
    return <TimePickerModal {...props} />;
};
