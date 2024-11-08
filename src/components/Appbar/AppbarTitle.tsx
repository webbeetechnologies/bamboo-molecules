import { ComponentType, memo, useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { TextProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import { AppbarContext } from './AppbarBase';

export type Props = TextProps & {
    size?: 'sm' | 'md' | 'lg';
    Wrapper?: ComponentType<any>;
};

const AppbarTitle = memo(({ style, children, Wrapper: WrapperProp, ...rest }: Props) => {
    const { Text } = useMolecules();

    const Wrapper = WrapperProp ?? Text;

    const { type } = useContext(AppbarContext);
    const componentStyles = useComponentStyles('Appbar_Title', style, {
        size: type === 'large' ? 'lg' : type === 'medium' ? 'md' : 'sm',
    });

    const titleStyles = useMemo(
        () => StyleSheet.flatten([styles[type], componentStyles]),
        [componentStyles, type],
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
