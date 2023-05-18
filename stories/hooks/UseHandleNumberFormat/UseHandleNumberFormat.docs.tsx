import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>useHandleNumberFormat Hook</H1>
            <Text>TODO - write docs</Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { useMolecules, useHandleNumberFormat } from 'bamboo-molecules';

const config = {
    prefix: 'Rs.',
    suffix: '',
    separator: '.',
    delimiter: ',',
    precision: 2,
    allowNegative: true
};

export const Example = (props: Props) => {
    const { TextInput } = useMolecules();
    const [number, setNumber] = useState<number | null>(null);
    
    const numberInputProps = useHandleNumberFormat({
        ...props,
        value: number,
        onChangeText: setNumber,
        config
    });

    return <TextInput {...numberInputProps} />;
};
`;

export default withDocsWrapper(DocsPage);
