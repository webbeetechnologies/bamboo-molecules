import type { ViewProps } from 'react-native';
import {
    useMolecules,
    CallbackActionState,
    withActionState,
    useComponentStyles,
    useCurrentTheme,
} from 'bamboo-molecules';

export type TitleProps = ViewProps & CallbackActionState & {};

export const CustomTitle = withActionState(({ hovered, pressed, focused }: TitleProps) => {
    const { View, Text } = useMolecules();
    const { fontSize, color, ...titleStyles } = useComponentStyles('CustomTitle');
    const { dark } = useCurrentTheme();

    return (
        <View style={titleStyles}>
            <Text
                style={{
                    fontSize: hovered ? 25 : fontSize,
                    color: pressed ? 'brown' : color,
                    borderBottomColor: focused || color,
                }}>
                Calculator App {dark ? 'Dark' : 'Light'}
            </Text>
        </View>
    );
});
