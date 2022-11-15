import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
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
import FlatGrid from '../../src/components/FlatGrid/FlatGrid';

const theme = extendTheme({
    colorMode: 'light',
    Text: {
        color: 'colors.onSurface',
    },
    Label: {
        color: 'colors.onSurface',
        fontSize: 18,
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
        ListItem,
        IconButton,
        Checkbox,
        FlatList,
        SectionList,
        TextInput,
        NumberInput,
        FilePicker,
        Label,
        HelperText,
        DatePickerInline,
        DatePickerModal,
        DatePickerInput,
        TimePickerModal,
        Icon,
        SectionGrid,
    } = useMolecules();
    const [isSwitchOn, toggleSwitch] = useToggle(true);
    const buttonRef = useRef(null);
    const [files, setFiles] = useState<any>(null);
    const [number, setNumber] = useState('222.a');
    const [pickTime, setPickTime] = useState(false);
    const [pickDate, setPickDate] = useState(false);

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

            <DatePickerInline mode="single" />

            <HorizontalDivider spacing={30} />

            <DatePickerInput
                locale={'en'}
                value={undefined}
                onChange={() => {}}
                inputMode="start"
            />

            <TimePickerModal
                visible={pickTime}
                onDismiss={() => setPickTime(false)}
                onConfirm={() => setPickTime(false)}
            />

            <DatePickerModal
                mode={'range'}
                visible={pickDate}
                onDismiss={() => setPickDate(false)}
            />

            <Button onPress={() => setPickTime(true)}>Pick Time</Button>

            <Button onPress={() => setPickDate(true)}>Pick Date Range</Button>

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

            <FlatList
                renderItem={({ item }) => (
                    <ListItem
                        style={{ marginBottom: 5 }}
                        titleStyle={{ fontWeight: '800', fontSize: 16 }}
                        divider={true}
                        right={
                            <Checkbox
                                status={isSwitchOn ? 'checked' : 'unchecked'}
                                onChange={toggleSwitch}
                            />
                        }>
                        <ListItem.Description>{item.description}</ListItem.Description>
                    </ListItem>
                )}
                data={[
                    { title: 'First item title', description: 'First item description' },
                    { title: 'Second item title', description: 'Second item description' },
                ]}
            />

            <FlashList
                renderItem={({ item }) => (
                    <ListItem
                        style={{ marginBottom: 5 }}
                        titleStyle={{ fontWeight: '800', fontSize: 16 }}
                        divider={true}
                        left={<Icon name="account" size={30} />}>
                        <ListItem.Title>{item.title}</ListItem.Title>
                        <ListItem.Description>{item.description}</ListItem.Description>
                    </ListItem>
                )}
                data={[
                    { title: 'First item title', description: 'First item description' },
                    { title: 'Second item title', description: 'Second item description' },
                ]}
            />

            <View style={{ height: 250 }}>
                <SectionList
                    sections={sectionData}
                    renderItem={({ item }) => (
                        <ListItem
                            onPress={() => {}}
                            style={{ marginBottom: 5 }}
                            titleStyle={{ fontWeight: '800', fontSize: 16 }}
                            right={
                                <IconButton
                                    name={isSwitchOn ? 'chevron-right' : 'chevron-left'}
                                    onPress={() => {}}
                                    variant="outlined"
                                    style={{ backgroundColor: 'colors.primary', color: '#fff' }}
                                    animated
                                />
                            }>
                            <ListItem.Title>{item.firstname}</ListItem.Title>
                        </ListItem>
                    )}
                    renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
                />
            </View>

            <FlatGrid
                itemDimension={130}
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={({ item }) => <Text>{item}</Text>}
            />

            <SectionGrid
                itemDimension={130}
                sections={[
                    {
                        title: 'Numbers',
                        data: ['1', '2', '3', '4', '5', '6'],
                    },
                    {
                        title: 'Alphabets',
                        data: ['A', 'B', 'C', 'D', 'E'],
                    },
                ]}
                renderItem={({ item }) => <Text>{item}</Text>}
                renderSectionHeader={({ section }) => (
                    <Text style={{ fontSize: 20 }}>{section.title}</Text>
                )}
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
    listIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
});

const sectionData = [
    {
        title: 'Title First',
        data: [
            {
                firstname: 'Ola',
                lastname: 'Asiko',
            },
            {
                firstname: 'eddy',
                lastname: 'Hydro',
            },
        ],
    },
    {
        title: 'Title Second',
        data: [
            {
                firstname: 'Whales',
                lastname: 'Teju',
            },
            {
                firstname: '12',
                lastname: 'USA',
            },
        ],
    },
];
