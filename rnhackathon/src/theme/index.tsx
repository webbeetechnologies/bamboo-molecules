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
    light: {
        colors: {
            ...lightColors,

            // @ts-ignore
           
        },
    },
    dark: {
        colors: {
            ...darkColors,

            // @ts-ignore
           
        },
    },
  
    Container:{
        style:{
            flex: 1,
            backgroundColor: '#00000005',
        
            padding: 10,
            position:'relative'
        },
        scrollViewStyle:{
            paddingBottom: 100,
        }
    }
});
