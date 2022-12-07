import React, { ComponentType } from 'react';
import Calculator from './src/Calculator/Calculator';

import {
    useMolecules as useAtomsMolecules,
    extendTheme,
    generateLightThemeColors,
    tokens,
    generateDarkThemeColors,
    ProvideMolecules,
    useComponentStyles,
    ViewProps,
    TextInputProps,
    TextProps,
} from 'bamboo-molecules';
import { ColorModeToggle } from './src/ColorModeToggle';

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

            numpadBox: '#ffffff',
            screenContainer: '#e3f4f9',
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
            numpadBox: '#1b1b1b',

            screenContainer: '#2b2b2b',
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
    NumpadContainer: {
        paddingTop: 'spacings.4',

        backgroundColor: 'colors.numpadBox',
    },
    ScreenContainer: {
        height:120,
        backgroundColor: 'colors.screenContainer',
        justifyContent: 'flex-end',
        padding: 'spacings.3',
    },
    HistoryCalInput: {
        backgroundColor: 'transparent',
        fontSize: 'fontSizes.4xl',
        textAlign: 'right',
        color: 'colors.onTextNumpad',

        padding: 0,
        flex: 1,
    },
    ResultText: {
        fontSize: 'fontSizes.3xl',
        fontWeight: 'fontWeights.semibold',
        textAlign: 'right',
        color: 'colors.onTextNumpad',
        opacity: 0.6,
    },
});
console.log(theme);

const NumpadContainer = ({ style, ...rest }: ViewProps) => {
    const { View } = useMolecules();

    const Style = useComponentStyles('NumpadContainer', style);

    return <View style={Style}>{rest.children}</View>;
};

const ScreenContainer = ({ style, ...rest }: ViewProps) => {
    const { View } = useMolecules();

    const Style = useComponentStyles('ScreenContainer', style);

    return <View style={Style}>{rest.children}</View>;
};

const someBasicStyleTextInput = {
    inputContainerStyle: {
        flex: 1,
    },
    style: {
        backgroundColor: 'transparent',
    },
};

const HistoryCalInput = ({ style, ...rest }: TextInputProps) => {
    const { TextInput } = useMolecules();

    const Style = useComponentStyles('HistoryCalInput', style);

    return (
        <TextInput
            inputStyle={Style}
            inputContainerStyle={someBasicStyleTextInput.inputContainerStyle}
            keyboardType="decimal-pad"
            numberOfLines={1}
            style={someBasicStyleTextInput.style}
            {...rest}
        />
    );
};
const ResultText = ({ style, ...rest }: TextProps) => {
    const { Text } = useMolecules();

    const Style = useComponentStyles('ResultText', style);

    return (
        <Text numberOfLines={1} adjustsFontSizeToFit style={Style}>
            {rest.children}
        </Text>
    );
};

export interface InjectedComponentTypes {
    NumpadContainer: ComponentType<ViewProps>;
    ScreenContainer: ComponentType<ViewProps>;
    HistoryCalInput: ComponentType<TextInputProps>;
    ResultText: ComponentType<TextProps>;
}

export const useMolecules = () => useAtomsMolecules<InjectedComponentTypes>();

const components = { NumpadContainer, ScreenContainer, HistoryCalInput, ResultText };

const App = () => {
    const { View } = useMolecules();
    return (
        <ProvideMolecules theme={theme} components={components}>
            <View style={{ maxWidth: 300 }}>
                <ColorModeToggle />
                <Calculator />
            </View>
        </ProvideMolecules>
    );
};

export default App;
