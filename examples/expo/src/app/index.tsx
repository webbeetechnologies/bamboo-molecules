// import ButtonTest from '@/components/Button';
// import BadgeTest from '@/components/Badge';
import { Button } from '@bambooapp/bamboo-molecules/src/components/Button';
import { TextInput } from '@bambooapp/bamboo-molecules/src/components/TextInput';
import { ActivityIndicator } from '@bambooapp/bamboo-molecules/src/components/ActivityIndicator';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ScrollView } from 'react-native';
import {
    Example as AccordionExample,
    ExampleControlled as AccordionControlledExample,
    ExampleNestedAccordion as AccordionNestedExample,
} from '@bambooapp-workspace/examples-common/components/Accordion';
import {
    CardWithMedia,
    CardsInCollection,
    ComposedCardExample,
    BasicCard,
} from '@bambooapp-workspace/examples-common/components/Card';
import {
    Example as AppbarExample,
    ExampleCenterAligned as AppbarExampleCenterAligned,
    ExampleLarge as AppbarExampleLarge,
    ExampleMedium as AppbarExampleMedium,
    ExampleSmall as AppbarExampleSmall,
} from '@bambooapp-workspace/examples-common/components/Appbar';
import { ReactNode } from 'react';
import { Avatar } from '@bambooapp/bamboo-molecules/src/components/Avatar';
import { Badge } from '@bambooapp/bamboo-molecules/src/components/Badge';
import Checkbox from '@bambooapp/bamboo-molecules/src/components/Checkbox/Checkbox';
import RadioButton from '@bambooapp/bamboo-molecules/src/components/RadioButton/RadioButton';
import { Chip } from '@bambooapp/bamboo-molecules/src/components/Chip';

const ComponentWithLabel = ({ label, children }: { label: string; children: ReactNode }) => {
    return (
        <View style={{ paddingVertical: 40, width: '100%' }}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );
};

const HomePage = () => {
    return (
        <ScrollView style={{ marginVertical: 50, flex: 1 }}>
            <View style={{ alignItems: 'flex-start' }}>
                {/* <ButtonTest style={styles.button} />

                <BadgeTest label="22" /> */}

                <Text>Home</Text>
                <View style={{ height: 45 }}>
                    <Button variant="contained" onPress={() => {}}>
                        contained
                    </Button>
                </View>
                <View style={{ height: 45 }}>
                    <Button variant="contained-tonal" onPress={() => {}}>
                        contained tonal
                    </Button>
                </View>
                <View style={{ height: 45 }}>
                    <Button variant="outlined" onPress={() => {}}>
                        outlined
                    </Button>
                </View>
                <View style={{ height: 45 }}>
                    <Button variant="elevated" onPress={() => {}}>
                        elevated
                    </Button>
                </View>
                <View style={{ height: 45 }}>
                    <Button variant="text" onPress={() => {}}>
                        text
                    </Button>
                </View>
                <ActivityIndicator size={50} />
                <Checkbox />
                <RadioButton value="radio" />
                <Chip.Input label="chip" variant="outlined" selected onPress={() => {}} />

                {examples.map(({ label, children }) => (
                    <ComponentWithLabel key={label} label={label}>
                        {children}
                    </ComponentWithLabel>
                ))}
            </View>
        </ScrollView>
    );
};

const examples = [
    {
        label: 'TextInput',
        children: <TextInput variant="outlined" label="Enter" />,
    },
    {
        label: 'Basic Card',
        children: <BasicCard />,
    },
    {
        label: 'CardsInCollection',
        children: <CardsInCollection />,
    },
    {
        label: 'CardWithMedia',
        children: <CardWithMedia />,
    },
    {
        label: 'ComposedCardExample',
        children: <ComposedCardExample />,
    },
    {
        label: 'Accordion',
        children: <AccordionExample />,
    },
    {
        label: 'Controlled Accordion',
        children: <AccordionControlledExample />,
    },
    {
        label: 'Nested Accordion',
        children: <AccordionNestedExample />,
    },
    {
        label: 'Appbar',
        children: <AppbarExample />,
    },
    {
        label: 'AppbarCenterAligned',
        children: <AppbarExampleCenterAligned />,
    },
    {
        label: 'Nested AppbarLarge',
        children: <AppbarExampleLarge />,
    },
    {
        label: 'AppbarMedium',
        children: <AppbarExampleMedium />,
    },
    {
        label: 'Nested AppbarSmall',
        children: <AppbarExampleSmall />,
    },
    {
        label: 'Avatar',
        children: (
            <Avatar
                size={60}
                label="Thet Aung"
                source={{ uri: 'https://www.eyerys.com/sites/default/files/mark_zuckerberg.jpg' }}
            />
        ),
    },
    {
        label: 'Badge',
        children: (
            <View style={{ alignItems: 'flex-start' }}>
                <Badge label="12" />
            </View>
        ),
    },
    {
        label: 'Badge without label',
        children: <Badge />,
    },
];

const styles = StyleSheet.create(theme => ({
    button: {
        backgroundColor: theme.colors.error,
        animationScale: theme.animation.scale,
    },
    div: {
        backgroundColor: theme.colors.primary,
    },
    span: {
        color: theme.colors.error,
    },
    label: {
        ...theme.typescale.labelLarge,
    },
}));

export default HomePage;
