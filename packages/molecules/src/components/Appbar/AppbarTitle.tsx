import { ComponentType, memo, useContext, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import type { TextProps } from 'react-native';
import { AppbarContext } from './AppbarBase';
import { appbarTitle } from './utils';

export type Props = TextProps & {
    size?: 'sm' | 'md' | 'lg';
    Wrapper?: ComponentType<any>;
};

const AppbarTitle = memo(({ style, children, Wrapper: WrapperProp, ...rest }: Props) => {
    const Wrapper = WrapperProp ?? Text;

    const { type } = useContext(AppbarContext);

    appbarTitle.useVariants({
        size: type === 'large' ? 'lg' : type === 'medium' ? 'md' : 'sm',
    });

    const titleStyles = useMemo(
        () => StyleSheet.flatten([styles[type], appbarTitle.root, style]),
        [style, type],
    );

    return (
        <Wrapper style={titleStyles} accessibilityRole="header" {...rest}>
            {children}
        </Wrapper>
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

AppbarTitle.displayName = 'Appbar_Title';

export default AppbarTitle;
