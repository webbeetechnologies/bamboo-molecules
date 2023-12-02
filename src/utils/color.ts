import color from 'color';

export const resolveContrastColor = (
    bgColor: string,
    lightColor: string = '#fff',
    darkColor: string = '#000',
) => {
    return color(bgColor).isLight() ? darkColor : lightColor;
};

export default color;
