import { memo, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { TextProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import { AppbarContext } from './AppbarBase';

export type Props = TextProps & {
    size?: 'sm' | 'md' | 'lg';
};

const AppbarTitle = memo(({ style, children, ...rest }: Props) => {
    const { Text } = useMolecules();
    const { type } = useContext(AppbarContext);
    const componentStyles = useComponentStyles('Appbar_Title', style, {
        size: type === 'large' ? 'lg' : type === 'medium' ? 'md' : 'sm',
    });

    const titleStyles = useMemo(
        () =>
            StyleSheet.flatten([
                type === 'center-aligned' ? styles.center : styles.left,
                componentStyles,
            ]),
        [componentStyles, type],
    );

    return (
        <Text style={titleStyles} accessibilityRole="header" {...rest}>
            {children}
        </Text>
    );
});

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
    },
    left: {
        justifyContent: 'flex-start',
    },
});

AppbarTitle.displayName = 'Appbar.Title';

export default AppbarTitle;
