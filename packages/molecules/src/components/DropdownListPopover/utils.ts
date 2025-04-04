import { StyleSheet } from 'react-native-unistyles';

export const defaultStyles = StyleSheet.create(theme => ({
    initialTransition: {
        opacity: 0,
    },
    animateTransition: {
        opacity: 1,
        transition: {
            duration: 150 as unknown as number,
        },
    },
    exitTransition: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 100,
        },
    },
    content: {
        borderRadius: theme.shapes.corner.extraSmall,
    },
    contentText: {
        display: 'flex',
        flexDirection: 'column',
    },
    backdrop: {
        opacity: 0,
    },
}));
