import type { ViewProps } from 'react-native';
import {
    useMolecules,
    CallbackActionState,
    withActionState,
    useComponentStyles,
    useColorMode,
} from 'bamboo-molecules';

export type TitleProps = ViewProps & CallbackActionState & {};

export const CustomTitle = withActionState(({ hovered, pressed, focused, style }: TitleProps) => {
    const { View, Text } = useMolecules();
    const { fontSize, color, borderBottomColor, ...titleStyles } = useComponentStyles(
        'CustomTitle',
        style,
        {
            states: { hovered: !!hovered, pressed: !!pressed, focused: !!focused },
        },
    );
    const colorMode = useColorMode();

    return (
        <View style={titleStyles}>
            <Text
                style={{
                    fontSize,
                    color,
                    borderBottomColor,
                }}>
                Calculator App {colorMode}
            </Text>
        </View>
    );
});
