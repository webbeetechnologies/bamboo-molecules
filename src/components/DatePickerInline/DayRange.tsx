import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';

function DayRange({
    leftCrop,
    rightCrop,
    inRange,
}: {
    leftCrop: boolean;
    rightCrop: boolean;
    inRange: boolean;
}) {
    const bothWays = inRange && leftCrop && rightCrop;
    const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

    const { View } = useMolecules();
    const componentStyles = useComponentStyles(
        'DatePicker_DayRange',
        {},
        {
            states: {
                isRightCrop: rightCrop,
                isLeftCrop: leftCrop,
                inRange,
                bothWays,
                isCrop,
            },
        },
    );

    const { containerStyle, rightCropStyle, leftCropStyle, centerCropStyle } = useMemo(() => {
        const {
            container,
            rightCrop: _rightCropStyle,
            leftCrop: _leftCropStyle,
            centerCrop,
        } = componentStyles;

        return {
            containerStyle: [StyleSheet.absoluteFill, container],
            rightCropStyle: _rightCropStyle,
            centerCropStyle: centerCrop,
            leftCropStyle: _leftCropStyle,
        };
    }, [componentStyles]);

    return (
        <>
            {(inRange || isCrop) && (
                <View pointerEvents="none" style={containerStyle}>
                    {isCrop && (
                        <>
                            <View style={rightCropStyle} />
                            <View style={centerCropStyle} />
                            <View style={leftCropStyle} />
                        </>
                    )}
                </View>
            )}
        </>
    );
}

export default memo(DayRange);
