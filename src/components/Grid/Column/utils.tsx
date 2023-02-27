export const generateColStyles = (numCols: number) => {
    const styles: any = {};
    for (let i = 1; i <= numCols; i++) {
        styles[`col-${i}`] = {
            flex: i,
            flexShrink: 0,
        };
    }
    return styles;
};
