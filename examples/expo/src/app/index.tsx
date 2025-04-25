import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
// import { Button } from '@bambooapp/bamboo-molecules/components/Button';
// import { Tooltip } from '@bambooapp/bamboo-molecules/components/Tooltip';
// import { IconButton } from '@bambooapp/bamboo-molecules/components/IconButton';
import { TextInput } from '@bambooapp/bamboo-molecules/components/TextInput';
// import { Switch } from '@bambooapp/bamboo-molecules/components/Switch';
// import { ActivityIndicator } from '@bambooapp/bamboo-molecules/components/ActivityIndicator';
// import { Checkbox } from '@bambooapp/bamboo-molecules/components/Checkbox';
// import { RadioButton } from '@bambooapp/bamboo-molecules/components/RadioButton';
// import { Chip } from '@bambooapp/bamboo-molecules/components/Chip';
// import { FAB } from '@bambooapp/bamboo-molecules/components/FAB';
// import { Link } from '@bambooapp/bamboo-molecules/components/Link';
// import { Popover } from '@bambooapp/bamboo-molecules/components/Popover';

import { Sidebar } from '@/components/Sidebar/Sidebar';
// import Popover from '@/components/Popover/Popover';
import { useToggle } from '@bambooapp/bamboo-molecules/hooks';
import { useRef } from 'react';

const styles = StyleSheet.create(theme => ({
    container: {
        padding: 20,
        width: '100%',
        height: '100%',
        paddingLeft: 100,
    },
    text: {
        color: theme.colors.primary,
    },
    scrollViewContent: {
        backgroundColor: 'red',
    },
}));

export default () => {
    const { state: visible, handleClose, handleOpen } = useToggle();
    const targetRef = useRef(null);

    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={{ alignItems: 'flex-start', marginTop: 100 }}>
                <TextInput variant="outlined" label={'Label'} />

                {/* <ScrollView style={{ gap: 20, marginTop: 100 }}>

                    <Link style={styles.link} href="/home">
                        Link
                    </Link>
                    <Button style={styles.button} variant="contained" onPress={() => {}}>
                        Hello
                    </Button>
                    <Button variant="contained-tonal" onPress={() => {}}>
                        Hello
                    </Button>
                    <Button variant="outlined" onPress={() => {}}>
                        Hello
                    </Button>
                    <Button variant="text" onPress={() => {}}>
                        Hello
                    </Button>
                    <TextInput variant="flat" label={'text'} />
                    <TextInput variant="outlined" label={'Label'} />
                    <Switch />
                    <Checkbox />
                    <ActivityIndicator />
                    <Chip.Input label="chip" selected onPress={() => {}} />
                    <RadioButton value={'tet'} />
                    <RadioButton.Item label="hello" value={'tet'} />

                    <FAB ref={targetRef} iconName="home" label="Press" onPress={handleOpen} />
                    <Popover
                        isOpen={visible}
                        onClose={handleClose}
                        showArrow
                        triggerRef={targetRef}
                        position="right">
                        <Text>Hello from popover</Text>
                    </Popover>

                    <Tooltip>
                        <Tooltip.Trigger>
                            <IconButton name="star-outline" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>mark as favorite</Tooltip.Content>
                    </Tooltip>
                    <Tooltip>
                        <Tooltip.Trigger>
                            <IconButton name="star-outline" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>mark as favorite2</Tooltip.Content>
                    </Tooltip>
                </ScrollView> */}
            </View>
        </View>
    );
};

// // import ButtonTest from '@/components/Button';
// // import BadgeTest from '@/components/Badge';
// import { Button } from '@bambooapp/bamboo-molecules/components/Button';
// import { TextInput } from '@bambooapp/bamboo-molecules/components/TextInput';
// import { ActivityIndicator } from '@bambooapp/bamboo-molecules/components/ActivityIndicator';
// import { View, Text } from 'react-native';
// import { StyleSheet } from 'react-native-unistyles';
// import { ScrollView } from 'react-native';
// import {
//     Example as AccordionExample,
//     ExampleControlled as AccordionControlledExample,
//     ExampleNestedAccordion as AccordionNestedExample,
// } from '@bambooapp-workspace/examples-common/components/Accordion';
// import {
//     CardWithMedia,
//     CardsInCollection,
//     ComposedCardExample,
//     BasicCard,
// } from '@bambooapp-workspace/examples-common/components/Card';
// import {
//     Example as AppbarExample,
//     ExampleCenterAligned as AppbarExampleCenterAligned,
//     ExampleLarge as AppbarExampleLarge,
//     ExampleMedium as AppbarExampleMedium,
//     ExampleSmall as AppbarExampleSmall,
// } from '@bambooapp-workspace/examples-common/components/Appbar';
// import { ReactNode, useRef } from 'react';
// import { Avatar } from '@bambooapp/bamboo-molecules/components/Avatar';
// import { Link } from '@bambooapp/bamboo-molecules/components/Link';
// import { Badge } from '@bambooapp/bamboo-molecules/components/Badge';
// import { Checkbox } from '@bambooapp/bamboo-molecules/components/Checkbox';
// // import RadioButton from '@bambooapp/bamboo-molecules/components/RadioButton/RadioButton';
// import { Chip } from '@bambooapp/bamboo-molecules/components/Chip';
// import { FAB } from '@bambooapp/bamboo-molecules/components/FAB';
// import { Popover } from '@bambooapp/bamboo-molecules/components/PopoverNext';
// import { useToggle } from '@bambooapp/bamboo-molecules/hooks';

// const ComponentWithLabel = ({ label, children }: { label: string; children: ReactNode }) => {
//     return (
//         <View style={{ paddingVertical: 40, width: '100%' }}>
//             <Text style={styles.label}>{label}</Text>
//             {children}
//         </View>
//     );
// };

// const HomePage = () => {
//     const { state: visible, handleClose, handleOpen } = useToggle();
//     const targetRef = useRef(null);
//     return (
//         <ScrollView style={{ marginVertical: 50, flex: 1 }}>
//             <View style={{ alignItems: 'flex-start' }}>
//                 <Checkbox defaultValue={true} />
//                 <Link href="https://google.com">Go to google</Link>

//                 <FAB ref={targetRef} iconName="home" label="Press" onPress={handleOpen} />
//                 <Popover
//                     isOpen={visible}
//                     onClose={handleClose}
//                     showArrow
//                     targetRef={targetRef}
//                     position="right">
//                     <Text>Hello from popover</Text>
//                 </Popover>
//                 {/* <ButtonTest style={styles.button} />

//                 <BadgeTest label="22" /> */}

//                 <Text>Home</Text>
//                 <View style={{ height: 45 }}>
//                     <Button variant="contained" onPress={() => {}}>
//                         contained
//                     </Button>
//                 </View>
//                 <View style={{ height: 45 }}>
//                     <Button variant="contained-tonal" onPress={() => {}}>
//                         contained tonal
//                     </Button>
//                 </View>
//                 <View style={{ height: 45 }}>
//                     <Button variant="outlined" onPress={() => {}}>
//                         outlined
//                     </Button>
//                 </View>
//                 <View style={{ height: 45 }}>
//                     <Button variant="elevated" onPress={() => {}}>
//                         elevated
//                     </Button>
//                 </View>
//                 <View style={{ height: 45 }}>
//                     <Button variant="text" onPress={() => {}}>
//                         text
//                     </Button>
//                 </View>
//                 <ActivityIndicator size={50} />
//                 <Chip.Input label="chip" variant="outlined" selected onPress={() => {}} />

//                 {examples.map(({ label, children }) => (
//                     <ComponentWithLabel key={label} label={label}>
//                         {children}
//                     </ComponentWithLabel>
//                 ))}
//             </View>
//         </ScrollView>
//     );
// };

// const examples = [
//     {
//         label: 'TextInput',
//         children: <TextInput variant="outlined" label="Enter" />,
//     },
//     {
//         label: 'Basic Card',
//         children: <BasicCard />,
//     },
//     {
//         label: 'CardsInCollection',
//         children: <CardsInCollection />,
//     },
//     {
//         label: 'CardWithMedia',
//         children: <CardWithMedia />,
//     },
//     {
//         label: 'ComposedCardExample',
//         children: <ComposedCardExample />,
//     },
//     {
//         label: 'Accordion',
//         children: <AccordionExample />,
//     },
//     {
//         label: 'Controlled Accordion',
//         children: <AccordionControlledExample />,
//     },
//     {
//         label: 'Nested Accordion',
//         children: <AccordionNestedExample />,
//     },
//     {
//         label: 'Appbar',
//         children: <AppbarExample />,
//     },
//     {
//         label: 'AppbarCenterAligned',
//         children: <AppbarExampleCenterAligned />,
//     },
//     {
//         label: 'Nested AppbarLarge',
//         children: <AppbarExampleLarge />,
//     },
//     {
//         label: 'AppbarMedium',
//         children: <AppbarExampleMedium />,
//     },
//     {
//         label: 'Nested AppbarSmall',
//         children: <AppbarExampleSmall />,
//     },
//     {
//         label: 'Avatar',
//         children: (
//             <Avatar
//                 size={60}
//                 label="Thet Aung"
//                 source={{ uri: 'https://www.eyerys.com/sites/default/files/mark_zuckerberg.jpg' }}
//             />
//         ),
//     },
//     {
//         label: 'Badge',
//         children: (
//             <View style={{ alignItems: 'flex-start' }}>
//                 <Badge label="12" />
//             </View>
//         ),
//     },
//     {
//         label: 'Badge without label',
//         children: <Badge />,
//     },
// ];

// const styles = StyleSheet.create(theme => ({
//     button: {
//         backgroundColor: theme.colors.error,
//         animationScale: theme.animation.scale,
//     },
//     div: {
//         backgroundColor: theme.colors.primary,
//     },
//     span: {
//         color: theme.colors.error,
//     },
//     label: {
//         ...theme.typescale.labelLarge,
//     },
// }));

// export default HomePage;
