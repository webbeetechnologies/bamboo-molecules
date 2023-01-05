import { StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import { useMolecules, AppbarProps } from 'bamboo-molecules';

export type Props = Omit<AppbarProps, 'children'>;

export const Example = ({ style, ...rest }: Props) => {
    const { Appbar } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <Appbar.Actions name="menu" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Default Appbar</Appbar.Title>
            <Appbar.Right>
                <Appbar.Actions name="star-outline" onPress={() => {}} />
                <Appbar.Actions name="pin-outline" onPress={() => {}} />
                <Appbar.Actions name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar>
    );
};
export const ExampleCenterAligned = ({ style, ...rest }: Props) => {
    const { Appbar } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.CenterAligned style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <Appbar.Actions name="menu" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Center-Aligned Appbar</Appbar.Title>
            <Appbar.Right>
                <Appbar.Actions name="heart-outline" onPress={() => {}} />
                <Appbar.Actions name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.CenterAligned>
    );
};

export const ExampleSmall = ({ style, ...rest }: Props) => {
    const { Appbar } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.Small style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <Appbar.Actions name="arrow-left" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Small Appbar</Appbar.Title>
            <Appbar.Right>
                <Appbar.Actions name="phone-outline" onPress={() => {}} />
                <Appbar.Actions name="magnify" onPress={() => {}} />
                <Appbar.Actions name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.Small>
    );
};

export const ExampleMedium = ({ style, ...rest }: Props) => {
    const { Appbar } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.Medium style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <Appbar.Actions name="arrow-left" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Medium Appbar</Appbar.Title>
            <Appbar.Right>
                <Appbar.Actions name="paperclip" onPress={() => {}} />
                <Appbar.Actions name="calendar" onPress={() => {}} />
                <Appbar.Actions name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.Medium>
    );
};

export const ExampleLarge = ({ style = {}, ...rest }: Props) => {
    const { Appbar } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.Large style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <Appbar.Actions name="arrow-left" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Large Appbar</Appbar.Title>
            <Appbar.Right>
                <Appbar.Actions name="paperclip" onPress={() => {}} />
                <Appbar.Actions name="calendar" onPress={() => {}} />
                <Appbar.Actions name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.Large>
    );
};
