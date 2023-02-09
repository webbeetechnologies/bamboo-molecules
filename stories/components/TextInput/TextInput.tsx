import { TextInput, TextInputProps } from '../../../src/components';

export type Props = TextInputProps;

export const Example = (props: Props) => {
    return <TextInput {...(props as any)} />;
};
