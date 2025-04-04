import {
    componentsRepository,
    componentsStylesRepository,
} from '@bambooapp/bamboo-molecules/src/core/componentsRegistry';
import { memo } from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const Button = ({ style }: { style?: ViewStyle }) => {
    const { backgroundColor } = style;
    return (
        <Pressable
            style={[styles.container, { backgroundColor }]}
            onPress={() => {
                // UnistylesRuntime.setTheme(
                //     UnistylesRuntime.themeName === 'light' ? 'other' : 'light',
                // );
            }}>
            <Text>Button</Text>
        </Pressable>
    );
};

const defaultStyles = StyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,

        _web: {
            _hover: {
                backgroundColor: 'blue',
            },
        },
    },
    text: {},
}));

componentsStylesRepository.registerOne('Button', defaultStyles);

const styles = componentsStylesRepository.get('Button');

componentsRepository.registerOne('Button', memo(Button));

export default componentsRepository.get('Button');
