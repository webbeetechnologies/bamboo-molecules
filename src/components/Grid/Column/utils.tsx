export const generateColStyles = (numCols: number) => {
    let styles: any = {};
    for (let i = 1; i <= numCols; i++) {
        styles[`col-${i}`] = {
            flexGrow: i,
            flexShrink: 0,
        };
    }
    return styles;
};
