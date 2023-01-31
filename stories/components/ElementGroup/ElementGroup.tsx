import { ElementGroup, ElementGroupProps } from '../../../src/components';

export type Props = ElementGroupProps & {};

export const Example = (props: Props) => {
    return <ElementGroup {...props} />;
};
