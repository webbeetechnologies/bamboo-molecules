export const normalizeBorderRadiuses = (borderRadiuses: Record<string, any>) => {
    const viableBorderRadiuses: Record<string, any> = {};

    Object.keys(borderRadiuses).forEach(key => {
        if (borderRadiuses[key] !== undefined && borderRadiuses[key] !== null) {
            viableBorderRadiuses[key] = borderRadiuses[key];
        }
    });

    return viableBorderRadiuses;
};
