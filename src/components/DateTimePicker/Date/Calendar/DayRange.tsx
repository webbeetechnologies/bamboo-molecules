import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { daySize } from '../dateUtils';

function DayRange({
    leftCrop,
    rightCrop,
    inRange,
    selectColor,
}: {
    leftCrop: boolean;
    rightCrop: boolean;
    inRange: boolean;
    selectColor: string;
}) {
    const bothWays = inRange && leftCrop && rightCrop;
    const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);

    const { containerStyle, rightCropStyle, leftCropStyle, centerCropStyle } = useMemo(() => {
        return {
            containerStyle: [
                StyleSheet.absoluteFill,
                styles.rangeRoot,
                bothWays && styles.rangeRootBoth,
                inRange && !isCrop
                    ? {
                          backgroundColor: selectColor,
                      }
                    : null,
            ],
            rightCropStyle: [
                styles.flex1,
                rightCrop
                    ? {
                          backgroundColor: selectColor,
                      }
                    : null,
            ],
            centerCropStyle: [
                {
                    backgroundColor: selectColor,
                    minWidth: daySize,
                    minHeight: daySize,
                },
                leftCrop ? styles.leftRadius : null,
                rightCrop ? styles.rightRadius : null,
            ],
            leftCropStyle: [
                styles.flex1,
                leftCrop
                    ? {
                          backgroundColor: selectColor,
                      }
                    : null,
            ],
        };
    }, [bothWays, inRange, isCrop, leftCrop, rightCrop, selectColor]);

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

const styles = StyleSheet.create({
    leftRadius: {
        borderBottomLeftRadius: daySize / 2,
        borderTopLeftRadius: daySize / 2,
    },
    rightRadius: {
        borderBottomRightRadius: daySize / 2,
        borderTopRightRadius: daySize / 2,
    },
    rangeRootBoth: {
        borderRadius: daySize / 2,
    },
    flex1: {
        flex: 1,
    },
    rangeRoot: {
        flexDirection: 'row',
    },
});

export default memo(DayRange);
