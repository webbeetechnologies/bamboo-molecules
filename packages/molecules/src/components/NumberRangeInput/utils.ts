import { StyleSheet } from 'react-native-unistyles';

export const numberRangeInputStyles = StyleSheet.create(theme => ({
    root: {},
    minInput: {
        flex: 1,
    },
    maxInput: {
        flex: 1,
    },
    errorText: {
        color: theme.colors.error,
    },
}));
