import React, { ComponentType } from 'react';
import { StyleSheet } from 'react-native';
import {
    extendTheme,
    ProvideMolecules,
    useMolecules,
    useComponentStyles,
    TextProps,
} from 'bamboo-molecules';

// creating theme styles similar to mdx
export const theme = extendTheme({
    H1: {
        marginTop: 20,
        marginBottom: 8,
        padding: 0,
        color: '#333333',
        fontSize: 34,
        fontWeight: '900',
    },
    H3: {
        marginTop: 20,
        marginBottom: 4,
        padding: 0,
        color: '#333333',
        fontSize: 21,
        fontWeight: '900',
    },
    Text: {
        lineHeight: 26,
        fontSize: 15,
        color: '#333333',
        marginVertical: 16,
    },
    Strong: {
        fontSize: 15,
        lineHeight: 24,
        color: '#333333',
    },
    Code: {
        lineHeight: 24,
        marginHorizontal: 2,
        paddingVertical: 3,
        paddingHorizontal: 5,
        whiteSpace: 'nowrap',
        borderRadius: 3,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        color: 'rgba(51,51,51,0.9)',
        backgroundColor: '#F8F8F8',
    },
});

// TODO declare our own useMolecules with InjectedComponentTypes
export interface InjectedComponentTypes {
    Code: ComponentType<TextProps>;
}

const Code = ({ style, ...rest }: TextProps) => {
    const { Text } = useMolecules();
    const codeTheme = useComponentStyles('Code');

    return <Text style={StyleSheet.flatten([codeTheme, style])} {...rest} />;
};

const components = { Code };

export const withDocsWrapper = (Component: () => JSX.Element) => (props: typeof Component) => {
    return (
        <ProvideMolecules components={components} theme={theme}>
            <Component {...props} />
        </ProvideMolecules>
    );
};
