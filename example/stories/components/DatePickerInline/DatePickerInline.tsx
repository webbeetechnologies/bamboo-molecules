import { useMolecules, DatePickerInlineProps } from 'bamboo-molecules';

export type Props = DatePickerInlineProps & {};

export const Example = (props: Props) => {
    const { DatePickerInline } = useMolecules();

    return <DatePickerInline {...props} onChange={undefined as any} />; // onChange as undefined to avoid storybook's mock action function
};
