import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
    extendTheme,
    ProvideMolecules,
    useMolecules,
    useToggle,
    withRipple,
    TextProps,
    documentTypes,
    useColorMode,
} from 'bamboo-molecules';

const theme = extendTheme({
    colorMode: 'light',
    Text: {
        color: 'colors.onSurface',
    },
    Label: {
        color: 'colors.onSurface',
        fontSize: 18,
    },
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
        HorizontalDivider,
        Switch,
        VerticalDivider,
        IconButton,
        Checkbox,
        TextInput,
        NumberInput,
        FilePicker,
        Label,
        HelperText,
    } = useMolecules();
    const [isSwitchOn, toggleSwitch] = useToggle(true);
    const buttonRef = useRef(null);
    const [files, setFiles] = useState<any>(null);
    const [number, setNumber] = useState('222.a');

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <View
            style={{
                backgroundColor: colorMode === 'light' ? '#fff' : '#424242',
                margin: -15,
                padding: 15,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Label>ColorMode - {colorMode}</Label>
                <IconButton
                    size="lg"
                    type="material-community"
                    name={colorMode === 'light' ? 'white-balance-sunny' : 'weather-night'}
                    onPress={toggleColorMode}
                />
            </View>
            <Surface elevation={2}>
                <TouchableRipple rippleColor="colors.primary" onPress={() => setFiles(null)}>
                    <View style={[styles.cardContainer]}>
                        <Text>Touchable Ripple Inside a Surface</Text>
                    </View>
                </TouchableRipple>
            </Surface>

            <HorizontalDivider spacing={30} />

            <FilePicker
                multiple
                type={[documentTypes.allFiles]}
                value={files}
                onChange={result => setFiles(result)}
            />
            <HelperText>Helper Text</HelperText>
            <HorizontalDivider spacing={30} />

            <TextInput
                variant="flat"
                placeholder="flat with left element"
                label="flat"
                left={({ color, forceFocus }) => (
                    <IconButton
                        name={'magnify'}
                        type="material-community"
                        style={{ margin: 0, color }}
                        onPress={forceFocus}
                    />
                )}
                style={{ paddingLeft: 20 }}
                size="sm"
                multiline
            />

            <HorizontalDivider spacing={30} />

            <TextInput
                variant="outlined"
                placeholder="multiline sm outlined"
                label="outlined"
                multiline
                size="sm"
            />

            <HorizontalDivider spacing={30} />

            <TextInput
                variant="outlined"
                placeholder="TextInput with custom height"
                label="multiline"
                multiline
                left={({ color, forceFocus }) => (
                    <IconButton
                        name={'magnify'}
                        type="material-community"
                        style={{ margin: 0, color }}
                        onPress={forceFocus}
                    />
                )}
                right={<Text>/100</Text>}
                style={{ height: 100 }}
                required
                error
                size="lg"
            />

            <HorizontalDivider spacing={30} />

            <NumberInput
                placeholder="Enter Numbers"
                label="Label"
                keyboardType="numeric"
                value={number}
                onChangeText={text => setNumber(text)}
            />

            <HorizontalDivider spacing={30} />

            <IconButton
                name={isSwitchOn ? 'chevron-left' : 'chevron-right'}
                onPress={() => {}}
                variant="outlined"
                style={{ backgroundColor: 'colors.primary', color: '#fff' }}
                animated
            />

            <Checkbox.Item
                status={isSwitchOn ? 'checked' : 'unchecked'}
                label="Checkbox Item"
                onChange={toggleSwitch}
            />
            <Checkbox status={isSwitchOn ? 'checked' : 'unchecked'} onChange={toggleSwitch} />
            <HorizontalDivider
                leftInset={28}
                rightInset={28}
                bold
                spacing={10}
                style={{ backgroundColor: 'colors.primary' }}
            />

            <CustomButton onPress={() => {}} rippleContainerStyles={{ width: 200, padding: 20 }}>
                withRipple HOC
            </CustomButton>

            <View style={{ flexDirection: 'row' }}>
                <Text>Left Side of the Divider</Text>
                <VerticalDivider spacing={10} />
                <Text>Right Side of the Divider</Text>
            </View>

            <HorizontalDivider spacing={30} />

            <Button
                variant="contained"
                onPress={() => {}}
                ref={buttonRef}
                size="lg"
                iconType="material-community"
                iconName="robot-angry-outline">
                Contained Button
            </Button>

            <Button
                variant="outlined"
                onPress={() => {}}
                iconType="material-community"
                iconName="robot-angry-outline">
                Outlined Button
            </Button>

            <Button
                variant="text"
                onPress={() => {}}
                iconType="material-community"
                iconName="robot-angry-outline">
                Text Button
            </Button>

            <Button
                variant="elevated"
                onPress={() => {}}
                iconType="material-community"
                iconName="robot-angry-outline">
                Elevated Button
            </Button>

            <Button
                variant="contained-tonal"
                onPress={() => {}}
                iconType="material-community"
                iconName="robot-angry-outline">
                Contained-tonal Button
            </Button>

            <Switch value={isSwitchOn} onValueChange={toggleSwitch} color="rgba(125, 82, 96, 1)" />
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

export const ComponentsDemo = () => {
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
