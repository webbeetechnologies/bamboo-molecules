import { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { TextProps } from '@webbee/bamboo-atoms';
import { extendTheme, ProvideMolecules, useMolecules, withRipple } from 'bamboo-molecules';

const theme = extendTheme({});

const Example = () => {
    const {
        Button,
        Surface,
        View,
        Text,
        TouchableRipple,
        ActivityIndicator,
        HorizontalDivider,
        Icon,
        Switch,
        VerticalDivider,
    } = useMolecules();
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onSwitchToggle = () => setIsSwitchOn(!isSwitchOn);

    return (
        <>
            <Surface elevation={2}>
                <TouchableRipple rippleColor="colors.primary" onPress={() => {}}>
                    <View style={[styles.cardContainer]}>
                        <Text>Test text</Text>
                        <ActivityIndicator animating={true} />
                    </View>
                </TouchableRipple>
            </Surface>
            <Icon type="material-community" name="robot-angry-outline" />

            <Text>Text</Text>
            <HorizontalDivider
                leftInset={28}
                rightInset={28}
                bold
                spacing={10}
                style={{ backgroundColor: 'colors.primary' }}
            />
            <Text>Divided</Text>

            <CustomButton onPress={() => {}} rippleContainerStyles={{ width: 200, padding: 20 }}>
                Custom Button
            </CustomButton>

            <View style={{ flexDirection: 'row' }}>
                <Text>Boy</Text>
                <VerticalDivider spacing={10} />
                <Text>Girl</Text>
            </View>

            <Button
                variant="contained"
                onPress={() => {}}
                iconType="material-community"
                contentStyle={{ flexDirection: 'row-reverse' }}
                iconName="robot-angry-outline">
                Primary Button
            </Button>

            <Switch
                value={isSwitchOn}
                onValueChange={onSwitchToggle}
                color="rgba(125, 82, 96, 1)"
            />
        </>
    );
};

// by inserting the component props with generics, withRipple will return the correctly typed component // TextProps will override/extend it's default type TouchableRippleProps
const CustomButton = withRipple<TextProps>(({ children }) => {
    const { View, Text } = useMolecules();
    return (
        <View>
            <Text>{children}</Text>
        </View>
    );
});

export default () => {
    return (
        <ProvideMolecules theme={theme}>
            <Example />
        </ProvideMolecules>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    cardContainer: {
        flexDirection: 'row',
        padding: 50,
    },
});
