import { StyleSheet } from 'react-native';
import {
    extendTheme,
    ProvideMolecules,
    useMolecules,
    useToggle,
    withRipple,
    TextProps,
} from 'bamboo-molecules';
import { useRef } from 'react';

const themeDark = extendTheme({
    colorMode: 'dark',
    Text: {
        color: '#fff',
    },
    Icon: {
        color: '#fff',
    },
    Button: {
        marginBottom: 10,
    },
});

const themeLight = extendTheme({
    colorMode: 'light',
    Button: {
        marginBottom: 10,
    },
});

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
        ListItem,
    } = useMolecules();
    const [isSwitchOn, toggleSwitch] = useToggle(true);
    const buttonRef = useRef(null);

    return (
        <View>
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
                ref={buttonRef}
                iconType="material-community"
                contentStyle={{ flexDirection: 'row-reverse' }}
                iconName="robot-angry-outline">
                Contained Button
            </Button>

            <Button
                variant="outlined"
                onPress={() => {}}
                iconType="material-community"
                contentStyle={{ flexDirection: 'row-reverse' }}
                iconName="robot-angry-outline">
                Outlined Button
            </Button>

            <Button
                variant="text"
                onPress={() => {}}
                iconType="material-community"
                contentStyle={{ flexDirection: 'row-reverse' }}
                iconName="robot-angry-outline">
                Text Button
            </Button>

            <Button
                variant="elevated"
                onPress={() => {}}
                iconType="material-community"
                contentStyle={{ flexDirection: 'row-reverse' }}
                iconName="robot-angry-outline">
                Elevated Button
            </Button>

            <Button
                variant="contained-tonal"
                onPress={() => {}}
                iconType="material-community"
                contentStyle={{ flexDirection: 'row-reverse' }}
                iconName="robot-angry-outline">
                Contained-tonal Button
            </Button>

            <Switch
                value={isSwitchOn}
                disabled
                onValueChange={toggleSwitch}
                color="rgba(125, 82, 96, 1)"
            />

            <ListItem
                rippleColor="pink"
                disabled={true}
                title="This is my title with description"
                description="This is my description"
                style={{ borderColor: 'colors.primary', borderWidth: 2, marginBottom: 10 }}
                titleStyle={{ fontWeight: '800', fontSize: 16 }}
                left={
                    <Icon
                        style={styles.listIcon}
                        type="material-community"
                        name="robot-angry-outline"
                    />
                }
                right={
                    <Icon
                        style={styles.listIcon}
                        type="material-community"
                        name="account-plus-outline"
                        size={20}
                    />
                }
            />
            <ListItem
                title="This is my title without description"
                style={{ borderColor: 'colors.primary', borderWidth: 1 }}
                titleStyle={{ fontWeight: '800', fontSize: 16 }}
                right={
                    <Icon
                        style={styles.listIcon}
                        type="material-community"
                        name="account-plus-outline"
                        size={20}
                    />
                }
            />
        </View>
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

export const ComponentsDemoLightMode = () => {
    return (
        <ProvideMolecules theme={themeLight}>
            <Example />
        </ProvideMolecules>
    );
};

export const ComponentsDemoDarkMode = () => {
    return (
        <ProvideMolecules theme={themeDark}>
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
    listIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        color: 'colors.primary',
    },
});
