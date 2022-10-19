import React from 'react';
import { useMolecules } from 'bamboo-molecules';
import { Source } from '@storybook/addon-docs';
import { InjectedComponentTypes, withDocsWrapper } from '../../common';

const DocsPage = () => {
    const { View, H1, H3, Text, Code } = useMolecules<InjectedComponentTypes>();

    return (
        <View>
            <H1>useComponentStyles Hook</H1>
            <Text>
                useComponentStyles hook is responsible for calculating all the complex styling
                logics of the Molecules components.
            </Text>
            <Text>
                It accepts 3 arguments - <Code>componentName</Code> which is the name of the
                component, <Code>style</Code> which is the style object(usually the style prop),{' '}
                <Code>resolvers</Code> which is an object that accepts 2 properties -{' '}
                <Code>variant</Code> which is the current variant of the component and{' '}
                <Code>states</Code> which can be the interaction states of the interactive
                components like Button.
                {'\n'}
                This can be understood more thoroughly by reading the type definition of{' '}
                <Code>ComponentStylePropWithVariants</Code> which is exported from Molecules
            </Text>
            <Text>
                It make use of the resolveComponentStyles and normalizeStyles functions to resolve
                and normalize the styles of the component.
            </Text>

            <H3>resolveComponentStyles function</H3>
            <Text>
                resolveComponentStyles function is responsible for almost all the calculation logics
                that goes on inside useComponentStyles hook.
                {'\n'}
                It accepts 4 arguments - <Code>componentTheme</Code> which is the style object
                stored inside the ThemeContext under the name of the component,
                <Code>variant</Code> which is the current variant of the component and{' '}
                <Code>states</Code> which can be the interaction states of the interactive, and
                <Code>style</Code> which is the style object(usually the style prop).
            </Text>
            <Text>
                <Code>componentTheme</Code> object is where <Code>resolveComponentStyles</Code>{' '}
                function look up all the styling references. It can have variant style objects
                and/or states styles objects.
            </Text>
            <Text>
                Using <Code>variant</Code> and <Code>states</Code> arguments, resolveComponent
                calculate and flatten all the style objects inside the <Code>componentTheme</Code>{' '}
                into a single flattened object.
            </Text>
            <Text>
                <Code>states</Code> argument is an object that can store boolean values under any
                key string.
            </Text>
            <Text>
                In the ThemeProvider, the <Code>states</Code> object need to have the same key with
                the Style Objects as values.
                {'\n'}
                <Code>states</Code> can be at the highest-level inside the ThemeProvider or they can
                be inside individual variant object.
            </Text>
            <Text>
                Calculation of <Code>resolveComponentStyles</Code> function is opinionated in a way
                that it will look for the first active state, top to down (top is the highest
                priority and bottom is the lowest), and if it's found it will apply the styles of
                that state and stop looking at other state styles.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />

            <Text>
                <Code>resolveComponentStyles</Code> functions is replaceable using the ThemeProvider
                to provide a possibility to replace all the styling logics of the Molecules
                components and extend/improve upon them.
            </Text>

            <Source language="tsx" code={secondCodeBlock} />

            <H3>normalizeStyles function</H3>
            <Text>
                <Code>normalizeStyles</Code> function is a simple function that normalizes an Object
                or an Array of Objects.
                {'\n'}
                Here, what we mean by <Code>normalizing</Code> is - converting all the design tokens
                into the actual values
            </Text>
            <Text>
                It requires an Object or an Array of Object to normalize and currentTheme to look up
                for the design token reference.
                {'\n'}
                <Code>currentTheme</Code> value is basically a set of design tokens we use and which
                is stored inside the ThemeContext. We can get it from <Code>useCurrentTheme</Code>{' '}
                hook.
                {'\n'}
                Please checkout <Code>useCurrentTheme</Code> hook's story for more details about
                this.
            </Text>

            <Source language="tsx" code={thirdCodeBlock} />

            <H3>To Summarize</H3>
            <Text>
                With combined functionalities from both of these functions,{' '}
                <Code>useComponentStyles</Code> hook can make complex styles calculation logics
                easy.
            </Text>
            <Text>
                Here is an example where we create a Button component with multiple variant styles
                and state styles -
            </Text>
            <Source language="tsx" code={fourthCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
export const buttonDefaultStyles: ComponentStylePropWithVariants<TextStyle, 'disabled'> = {
    minWidth: 64,
    borderStyle: 'solid',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,

    states: { // highest-level state // general
        disabled: {
            color: 'colors.onSurfaceDisabled',
        },
    },
    
    variants: {
        outlined: {
            backgroundColor: 'transparent',
            color: 'colors.primary',
            borderColor: 'colors.outline',
            borderWidth: 1,

            // lower-level state // more specific 
            // this will merge with higher-level state and override it if it has the same properties
            states: { 
                disabled: {
                    borderColor: 'colors.surfaceDisabled',
                },
            },
        },
      }
    }
}

const theme = extendTheme({
    CustomButton: buttonDefaultStyles,
});
`;

const secondCodeBlock = `
const myResolveComponentStyles = ({ // This will get all the 4 arguments that the default resolveComponentStyles gets
    componentTheme,
    variant,
    states,
    style,
}) => {
   // my calculation logics
}

export const App = (props: Props) => {
    return (
        <ProvideMolecules theme={theme} resolveComponentStyles={myResolveComponentStyles}>
            <Components {...props} />
        </ProvideMolecules>
    );
};
`;

const thirdCodeBlock = `
const unnormalizedStyles = {
    color: 'colors.onPrimary',
    containerColor: 'colors.primary',
    borderRadius: 'roundness.1'
}

// here we create a hook that'll normalize the style objects
const useNormalizeStyles = (styleObj) => {
    const currentTheme = useCurrentTheme();
    const normalizedStyles = normalizeStyles(styleObj, currentTheme);
    
    return normalizedStyles;
}

const MyComponent = () => {
    const myStyles = useNormalizeStyles(unnormalizedStyles);
    console.log(myStyles); // object with normalized values
    
    return (
        . . .
    );
}

export const App = () => {
    return (
        <ProvideMolecules>
            <MyComponent />
        </ProvideMolecules>
    );
};
`;

const fourthCodeBlock = `
import type { TextStyle } from 'react-native';
import {
    ProvideMolecules,
    useMolecules,
    extendTheme,
    useComponentStyles,
    ComponentStylePropWithVariants,
    TouchableRippleProps,
} from 'bamboo-molecules';

export type Props = TouchableRippleProps & {
    variant?: 'outlined' | 'text' | 'contained';
};

export const buttonDefaultStyles: ComponentStylePropWithVariants<TextStyle, 'disabled'> = {
    minWidth: 64,
    borderStyle: 'solid',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,

    states: {
        disabled: {
            color: 'colors.onSurfaceDisabled',
        },
    },
    variants: {
        outlined: {
            backgroundColor: 'transparent',
            color: 'colors.primary',
            borderColor: 'colors.outline',
            borderWidth: 1,

            states: {
                disabled: {
                    borderColor: 'colors.surfaceDisabled',
                },
            },
        },
        text: {
            backgroundColor: 'transparent',
            color: 'colors.primary',

            states: {
                disabled: {},
            },
        },
        contained: {
            backgroundColor: 'colors.primary',
            color: 'colors.onPrimary',

            states: {
                disabled: {
                    backgroundColor: 'transparent',
                },
            },
        },
    },
};

const theme = extendTheme({
    CustomButton: buttonDefaultStyles,
});

export const Button = ({
    style,
    variant = 'text',
    disabled: disabledProp,
    onPress,
    ...rest
}: Props) => {
    const disabled = disabledProp || !onPress; // we want the button to be in a disabled state if onPress is not provided
    const { TouchableRipple, Text } = useMolecules();
    const { color, ...buttonStyles } = useComponentStyles('CustomButton', style, {
        variant: variant,
        states: { disabled },
    });

    return (
        <TouchableRipple
            style={buttonStyles}
            disabled={disabledProp}
            onPress={onPress}
            accessibilityRole="button"
            {...rest}>
            <Text selectable={false} style={{ color }}>
                Custom Button
            </Text>
        </TouchableRipple>
    );
};

export const App = () => {
    return (
        <ProvideMolecules theme={theme}>
            <Button />
        </ProvideMolecules>
    );
};
`;

export default withDocsWrapper(DocsPage);
