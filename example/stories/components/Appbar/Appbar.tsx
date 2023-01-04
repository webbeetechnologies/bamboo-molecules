import { StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import { useMolecules, AppbarProps } from 'bamboo-molecules';

export type Props = Omit<AppbarProps, 'children'>;

export const Example = ({ style, ...rest }: Props) => {
    const { Appbar, IconButton } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <IconButton name="menu" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Default Appbar</Appbar.Title>
            <Appbar.Right>
                <IconButton name="star-outline" onPress={() => {}} />
                <IconButton name="pin-outline" onPress={() => {}} />
                <IconButton name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar>
    );
};
export const ExampleCenterAligned = ({ style, ...rest }: Props) => {
    const { Appbar, IconButton } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.CenterAligned style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <IconButton name="menu" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Center-Aligned Appbar</Appbar.Title>
            <Appbar.Right>
                <IconButton name="heart-outline" onPress={() => {}} />
                <IconButton name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.CenterAligned>
    );
};

export const ExampleSmall = ({ style, ...rest }: Props) => {
    const { Appbar, IconButton } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.Small style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <IconButton name="arrow-left" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Small Appbar</Appbar.Title>
            <Appbar.Right>
                <IconButton name="phone-outline" onPress={() => {}} />
                <IconButton name="magnify" onPress={() => {}} />
                <IconButton name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.Small>
    );
};

export const ExampleMedium = ({ style, ...rest }: Props) => {
    const { Appbar, IconButton } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.Medium style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <IconButton name="arrow-left" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Medium Appbar</Appbar.Title>
            <Appbar.Right>
                <IconButton name="paperclip" onPress={() => {}} />
                <IconButton name="calendar" onPress={() => {}} />
                <IconButton name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.Medium>
    );
};

export const ExampleLarge = ({ style = {}, ...rest }: Props) => {
    const { Appbar, IconButton } = useMolecules();
    const { width } = useWindowDimensions();

    return (
        <Appbar.Large style={StyleSheet.flatten([{ width }, style]) as ViewStyle} {...rest}>
            <Appbar.Left>
                <IconButton name="arrow-left" onPress={() => {}} />
            </Appbar.Left>
            <Appbar.Title>Large Appbar</Appbar.Title>
            <Appbar.Right>
                <IconButton name="paperclip" onPress={() => {}} />
                <IconButton name="calendar" onPress={() => {}} />
                <IconButton name="dots-vertical" onPress={() => {}} />
            </Appbar.Right>
        </Appbar.Large>
    );
};
