import { useToken } from '../../../src';
import { useMolecules } from '../../common';
import { Example as UseCurrentThemeStories } from '../UseCurrentTheme/UseCurrentTheme';

export type UseTokenExampleProps = {
    token?: string;
};

const textStyle = {
    marginBottom: 'spacings.2',
};

const codeStyle = {
    borderWidth: 1,
    borderColor: 'colors.onNeutral1',
    padding: 'spacings.1',
    borderRadius: 'shapes.corner.extraSmall' as unknown as number,
};

const Code = ({ label = '' }) => {
    const { View, Text } = useMolecules();
    return (
        <View>
            <Text style={codeStyle}>{label}</Text>
        </View>
    );
};

export const Example = (props: UseTokenExampleProps) => {
    const { View, Text, HorizontalDivider } = useMolecules();
    const token = props.token || 'colors.primary50';
    const resolvedToken = useToken(props.token || 'colors.primary50');

    return (
        <View>
            <Text style={textStyle}>
                Unresolved token: <Code label={token} />
            </Text>
            <Text>
                Resolved token:{' '}
                <Code
                    label={resolvedToken ? JSON.stringify(resolvedToken) : "Token Doesn't exist"}
                />
            </Text>
            <HorizontalDivider spacing={4} />
            <Text>All then tokens available by default: </Text>
            <UseCurrentThemeStories />
        </View>
    );
};
