import {
    extendTheme,
    generateLightThemeColors,
    tokens,
    generateDarkThemeColors,
} from 'bamboo-molecules';

const ref = tokens.md.ref;

const lightColors = generateLightThemeColors(ref.palette, ref.opacity);
const darkColors = generateDarkThemeColors(ref.palette, ref.opacity);

export const theme = extendTheme({
    colorMode: 'light',
    light: {
        colors: {
            ...lightColors,
            // @ts-ignore

            bg: '#f8fafc',
            bg800: '#f1f5f9',
            bg700: '#e2e8f0',
            bg600: '#cbd5e1',

            textColor: '#0f172a',
            textColor800: '#1e293b',
            textColor700: '#334155',
            textColor600: '#475569',
        },
    },
    dark: {
        colors: {
            ...darkColors,

            // @ts-ignore
            bg: '#0f172a',
            bg800: '#1e293b',
            bg700: '#334155',
            bg600: '#475569',

            textColor: '#f8fafc',
            textColor800: '#f1f5f9',
            textColor700: '#e2e8f0',
            textColor600: '#cbd5e1',
        },
    },

    Container: {
        style: {
            flex: 1,
            backgroundColor: 'colors.bg',

            position: 'relative',
        },
        scrollViewStyle: {
            paddingBottom: 100,
        },
    },

    Text: {
        h1: {
            typeScale: 'typescale.displayLarge',
            color: 'colors.textColor',
        },
        h2: {
            typeScale: 'typescale.displayMedium',
            color: 'colors.textColor',
        },
        h3: {
            typeScale: 'typescale.displaySmall',
            color: 'colors.textColor',
        },
        h4: {
            typeScale: 'typescale.headlineLarge',
            color: 'colors.textColor',
        },
        h5: {
            typeScale: 'typescale.headlineMedium',
            color: 'colors.textColor',
        },
        h6: {
            typeScale: 'typescale.headlineSmall',
            color: 'colors.textColor',
        },
        md: {
            typeScale: 'typescale.titleLarge',
            color: 'colors.textColor',
        },
        rg: {
            typeScale: 'typescale.titleMedium',
            color: 'colors.textColor',
        },
        sm: {
            typeScale: 'typescale.titleSmall',
            color: 'colors.textColor',
        },
    },
    TextInput: {
        variants: {
            outlined: {
                backgroundColor: 'colors.bg800',
            },
        },
    },
    Button: {
        sizes: {
            lg: {
                borderRadius: 'roundness.1',
            },
            md: {
                borderRadius: 'roundness.1',
            },
            sm: {
                borderRadius: 'roundness.1',
            },
        },
    },
    Drawer:{
        headerStyle : {
            backgroundColor: 'colors.bg800',
        },
        drawerStyle:{
            backgroundColor:'colors.bg800'
        },
        headerTitleStyle:{
            color:'colors.textColor'
        },
       drawerLabelStyle:{
        color:'colors.textColor'
       },
       headerTintColor: 'colors.textColor',
    }
});

