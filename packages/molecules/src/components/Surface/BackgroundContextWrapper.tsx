import { ReactNode, useContext, useMemo } from 'react';
import { BackgroundContext } from '../../utils';
import { useContrastColor } from '../../hooks';

export const BackgroundContextWrapper = ({
    backgroundColor,
    children,
}: {
    backgroundColor: string;
    children: ReactNode;
}) => {
    const contrastColor = useContrastColor(backgroundColor, undefined, undefined);

    const parentContext = useContext(BackgroundContext);
    const isTransparent = backgroundColor === 'transparent';

    const surfaceContextValue = useMemo(
        () => ({
            backgroundColor,
            color: contrastColor,
        }),
        [backgroundColor, contrastColor],
    );

    return (
        <BackgroundContext.Provider value={isTransparent ? parentContext : surfaceContextValue}>
            {children}
        </BackgroundContext.Provider>
    );
};
