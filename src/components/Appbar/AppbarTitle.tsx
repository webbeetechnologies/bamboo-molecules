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
        () => StyleSheet.flatten([styles[type], componentStyles]),
        [componentStyles, type],
    );

    return (
        <Text style={titleStyles} accessibilityRole="header" {...rest}>
            {children}
        </Text>
    );
});

const styles = StyleSheet.create({
    'center-aligned': {
        justifyContent: 'center',
    },
    small: {
        justifyContent: 'flex-start',
    },
    medium: {
        alignItems: 'flex-end',
    },
    large: {
        alignItems: 'flex-end',
    },
});

AppbarTitle.displayName = 'Appbar.Title';

export default AppbarTitle;
