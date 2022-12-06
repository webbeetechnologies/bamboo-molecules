// import Cases from './Cases';

// export default () => <Cases />;

import React from 'react';
import Calculator from './src/Calculator/Calculator';

import { ProvideMolecules } from '../src/core';
import {
    useColorMode,
    useMolecules,
    extendTheme,
    generateLightThemeColors,
    tokens,
    generateDarkThemeColors,
} from 'bamboo-molecules';

const ref = tokens.md.ref;

const lightColors = generateLightThemeColors(ref.palette, ref.opacity);
const darkColors = generateDarkThemeColors(ref.palette, ref.opacity);

const theme = extendTheme({
    light: {
        colors: {
            ...lightColors,

            // @ts-ignore
            operator: '#80d7ff',
            operatorOnHover: '#59cafe',
            clear: '#ff8080',
            clearOnHover: '#fe5959',
            equal: '#80ffb4',
            equalOnHover: '#59fe9d',
            onTextNumpad: '#000000d0',

            primary: 'rgb(182, 157, 248)',
        },
    },
    dark: {
        colors: {
            ...darkColors,

            // @ts-ignore
            operator: '#80d7ff',
            operatorOnHover: '#59cafe',
            clear: '#ff8080',
            clearOnHover: '#fe5959',
            equal: '#80ffb4',
            equalOnHover: '#59fe9d',
            onTextNumpad: '#ffffffd0',

            primary: 'rgb(182, 157, 248)',
        },
    },
    Button: {
        sizes: {
            xl: {
                fontSize: 'fontSizes.2xl',
                borderRadius: 'roundness.5',
            },
        },
        variants: {
            primary: {
                backgroundColor: 'colors.primary',
                color: 'colors.onTextNumpad',

                states: {
                    disabled: {
                        backgroundColor: 'transparent',
                    },
                    hovered: {
                        backgroundColor: 'colors.primaryOnHover',
                    },
                },
            },
            secondary: {
                backgroundColor: 'colors.operator',
                color: 'colors.onTextNumpad',

                states: {
                    disabled: {
                        backgroundColor: 'transparent',
                    },
                    hovered: {
                        backgroundColor: 'colors.operatorOnHover',
                    },
                },
            },
            clear: {
                backgroundColor: 'colors.clear',
                color: 'colors.onTextNumpad',

                states: {
                    disabled: {
                        backgroundColor: 'transparent',
                    },
                    hovered: {
                        backgroundColor: 'colors.clearOnHover',
                    },
                },
            },
            equal: {
                backgroundColor: 'colors.equal',
                color: 'colors.onTextNumpad',

                states: {
                    disabled: {
                        backgroundColor: 'transparent',
                    },
                    hovered: {
                        backgroundColor: 'colors.equalOnHover',
                    },
                },
            },
        },
    },
});

const App = () => {
    return (
        <ProvideMolecules theme={theme}>
            <WrapCalculator />
        </ProvideMolecules>
    );
};

export default App;

const WrapCalculator = () => {
    const { View, Label, IconButton } = useMolecules();
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Label>ColorMode - {colorMode}</Label>
                <IconButton
                    size="lg"
                    type="material-community"
                    name={colorMode === 'light' ? 'white-balance-sunny' : 'weather-night'}
                    onPress={toggleColorMode}
                />
            </View>
            <Calculator
                // onChange={res => console.log(res)}
                style={{
                    maxWidth: 300,
                }}
            />
        </>
    );
};
