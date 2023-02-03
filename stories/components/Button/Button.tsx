import { Button, ButtonProps } from '../../../src/components';

export type Props = ButtonProps;

export const Example = (props: ButtonProps) => {
    return <Button {...props} />;
};
