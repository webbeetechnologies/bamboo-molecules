import { OptionList, OptionListProps } from '../../../src/components';

export type Props = OptionListProps & {};

export const Example = (props: Props) => {
    return <OptionList {...props} />;
};
