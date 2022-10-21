import React, { ComponentType } from 'react';
import { Platform, StatusBar } from 'react-native';
import { ProvideMolecules, extendTheme, ViewProps } from 'bamboo-molecules';
import { RoundButton } from '../components/button';
import Row from '../components/Row';
import Container from '../components/container';
import CalcWrapper from '../components/container/CalcWrapper';
import { ResultText, ResultTextProps } from '../components/ResultText';
import { RoundButtonProps } from 'src/components/button/RoundButton';
import { CustomTitle, TitleProps } from '../components/Title';

export const theme = extendTheme({
    colorMode: 'light',
    dark: {
        dark: true,
        colors: {
            primary: '#fff',
            secondary: '#333333',
        },
    },
    light: {
        dark: false,
        colors: {
            primary: '#333333',
            secondary: '#fff',
        },
    },
    Text: {
        lineHeight: 26,
        color: '#ddd',
        fontSize: 24,
    },
    RoundButton: {
        backgroundColor: '#a6a6a6',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        color: '#fff',
        variants: {
            outlined: {
                backgroundColor: 'orange',
                color: '#fff',
                borderColor: '#333333',
                textAlign: 'right',
                marginRight: 20,
                marginBottom: 10,
                states: {
                    disabled: {
                        borderColor: 'colors.surfaceDisabled',
                    },
                },
            },
            text: {
                backgroundColor: '#5d5c5c',
                color: 'white',
                states: {
                    disabled: {},
                },
            },
            contained: {
                backgroundColor: 'green',
                color: 'white',

                states: {
                    disabled: {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
    },
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'colors.secondary',
        // justifyContent: 'flex-end',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    CalcWrapper: {
        borderColor: '#333333',
        borderWidth: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
        paddingTop: 70,
        borderRadius: 10,
        backgroundColor: 'colors.primary',
    },
    ResultText: {
        textAlign: 'right',
        marginRight: 25,
        marginBottom: 20,
        fontSize: 25,
        color: 'colors.secondary',
    },
    CustomTitle: {
        marginBottom: 30,
        color: 'colors.primary',
        fontSize: 15,
    },
});

export interface InjectedComponentTypes {
    RoundButton: ComponentType<RoundButtonProps>;
    Row: ComponentType<ViewProps>;
    Container: ComponentType<ViewProps>;
    CalcWrapper: ComponentType<ViewProps>;
    ResultText: ComponentType<ResultTextProps>;
    CustomTitle: ComponentType<TitleProps>;
}

const components = { RoundButton, Row, Container, CalcWrapper, ResultText, CustomTitle };

export const calculatorWrapper = (Component: () => JSX.Element) => (props: typeof Component) => {
    return (
        <ProvideMolecules components={components} theme={theme}>
            <Component {...props} />
        </ProvideMolecules>
    );
};
