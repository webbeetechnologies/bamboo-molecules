import React from 'react';
import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, H3, Text, Code, Strong, DocLink } = useMolecules();

    return (
        <View>
            <H1>Provide Molecules</H1>
            <Text>
                Provide Molecules is a combination of ThemeProvider, ComponentsProvider and
                PlatformProvider.
            </Text>

            <H3>ThemeProvider</H3>
            <Text>
                Molecules' Theme Provider is extended from <Code>bamboo-atoms</Code>' Theme
                Provider.
                {'\n'}
                It provides all the functionalities that <Code>bamboo-atoms</Code>' Theme Provider
                provides and more.
            </Text>

            <Text>
                It includes the <Strong>Design Tokens.</Strong>
                {'\n'}
            </Text>
            <Text>
                According to MD3 docs . . .{'\n'}
                <Strong>
                    Design tokens represent the small, repeated design decisions that make up a
                    design system's visual style. Tokens replace static values, such as hex codes
                    for color, with self-explanatory names.
                </Strong>
            </Text>

            <Text>
                All the design tokens that we use are stored inside the ThemeContext.
                {'\n'}
                There are 2 sets of the design tokens that we use - <Code>light</Code> and{' '}
                <Code>dark</Code> for each colorModes. We extensively make use of the design tokens
                to create complex components in Molecules.
            </Text>

            <Text>
                We provided a way to store the design tokens in the <Code>ThemeContext</Code>,
                replace the existing ones, extend them, or create the new ones.
                {'\n'}
                We also provide a way to normalize the design tokens with a hook,{' '}
                <Code>useComponentStyles</Code>, or with a function, <Code>normalizeStyles</Code>
            </Text>

            <Text>
                As an advanced use-case, we also provide a way to easily replace the set of color
                tokens that we have with your custom generated MD3 tokens by exporting the token
                generator functions for both light and dark themes -{' '}
                <Code>generateLightThemeColors</Code>, <Code>generateDarkThemeColors</Code>
                {'\n'}
                Those functions accepts 2 arguments, <Code>palette</Code> which is the MD3 Color
                Palette and the <Code>opacity</Code> object which accepts level1 - level4 opacity
                values as numbers. (The MD3 Color Palettes can easily be generated using MD3 palette
                generators.)
            </Text>
            <Source language="tsx" code={firstCodeBlock} />

            <H3>Design Tokens</H3>
            <Text>
                Here is an example of usage the design tokens, inside the Theme or with the style
                props.
                {'\n'}
                (All the Molecules components are built in a way so that the design tokens can be
                passed down inside the style prop. Behind the scenes, we normalize the tokens and
                replace them with actual values using <Code>useComponentStyles</Code> hook and/or
                <Code>normalizeStyles</Code> function).
            </Text>

            <Source language="tsx" code={secondCodeBlock} />

            <Text>
                Using ThemeProvider in combination with useComponentStyles can make complex styling
                logics easier . . .
            </Text>

            <Text>
                Here is an advanced example where a Button Component with different variant styles
                and action states styles is created with a very minimal code -{' '}
            </Text>

            <Text>
                To read more about <Code>useComponentStyles</Code> hook, please read the{' '}
                <DocLink href={{ idOrTitle: 'hooks/useComponentStyles' }}>
                    useComponentStyles docs
                </DocLink>
                .
            </Text>

            <Source language="tsx" code={thirdCodeBlock} />

            <H3>Components Provider</H3>
            <Text>
                Components Provider is extended from <Code>bamboo-atoms</Code>' Components Provider
                with higher-level components added.
            </Text>
            <Text>
                Currently, added components are - ActivityIndicator, Button, HorizontalDivider,
                Icon, Surface, Switch, TouchableRipple, VerticalDivider with more to come.
            </Text>

            <H3>Platform Provider</H3>
            <Text>
                Platform Provider is created so that the user can specify the Platform Type of their
                choice. This will be useful in Web where the user can choose between the Platform
                specific style types - <Strong>ios</Strong> or <Strong>android</Strong>.
            </Text>
            <Text>
                Android styles will be based from MD3 Styles and IOS styles will be based from
                Cupertino styles.
            </Text>
        </View>
    );
};

const firstCodeBlock = `
import { generateLightThemeColors, generateDarkThemeColors } from 'bamboo-molecules'

// with extendTheme we don't have to worry about overriding the unset values because it will deepmerge everything
const theme = extendTheme({
  light: {
        colors: generateLightThemeColors(myCustomPalette, myCustomOpacities)
    },
    dark: {
      colors: generateDarkThemeColors(myCustomPalette, myCustomOpacities)
  }
});
`;

const secondCodeBlock = `
const theme = extendTheme({
    CustomButton: {
        color: 'colors.primary',
        borderColor: 'colors.outline',
        borderRadius: 'shapes.corner.extraSmall',
    },
});

export const Button = ({
    style = { color: 'colors.tertiary' }, // this will override the color provided in the ThemeProvider
    ...rest
}: Props) => {
    const { TouchableRipple, Text } = useMolecules();
    const { color, ...buttonStyles } = useComponentStyles('CustomButton', style);

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
`;

const thirdCodeBlock = `
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

// App.tsx
export const App = () => {
    return (
        <ProvideMolecules theme={theme}>
            <Button />
        </ProvideMolecules>
    );
};
`;

export default withDocsWrapper(DocsPage);
