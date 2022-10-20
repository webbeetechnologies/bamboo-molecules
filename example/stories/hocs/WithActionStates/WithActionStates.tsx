import type { ViewProps } from 'react-native';
import {
    ProvideMolecules,
    useMolecules,
    CallbackActionState,
    withActionState,
} from 'bamboo-molecules';

type Props = ViewProps & CallbackActionState & {};

export const Components = withActionState(({ hovered, pressed, focused }: Props) => {
    const { View, Text, Strong, HorizontalDivider } = useMolecules();

    return (
        <View>
            <Text>Current states - </Text>
            <HorizontalDivider spacing={10} />
            <Text>
                pressed <Strong>{pressed ? 'true' : 'false'}</Strong>
            </Text>
            <HorizontalDivider spacing={10} />
            <Text>
                focused <Strong>{focused ? 'true' : 'false'}</Strong>
            </Text>
            <HorizontalDivider spacing={10} />
            <Text>
                hovered <Strong>{hovered ? 'true' : 'false'}</Strong>
            </Text>
        </View>
    );
});

export const Example = () => {
    return (
        <ProvideMolecules>
            <Components />
        </ProvideMolecules>
    );
};
