import type { ViewProps } from 'react-native';
import {
    useMolecules,
    CallbackActionState,
    withActionState,
    useComponentStyles,
} from 'bamboo-molecules';

export type ResultTextProps = ViewProps & CallbackActionState & {};

export const ResultText = withActionState(({ hovered }: ResultTextProps) => {
    const { View, Text } = useMolecules();
    const { color, fontSize, ...resultStyles } = useComponentStyles('ResultText');

    return (
        <View>
            <View style={resultStyles}>
                <Text style={{ color, fontSize: hovered ? 30 : fontSize }}>0.00</Text>
            </View>
        </View>
    );
});
