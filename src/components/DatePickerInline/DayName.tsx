import { memo, useMemo } from 'react';
import { useMolecules, useComponentStyles } from '../../hooks';

function DayName({ label }: { label: string }) {
    const { Text, View } = useMolecules();
    const componentStyles = useComponentStyles('DatePicker_DayName');

    const { dayNameStyle, textStyle } = useMemo(() => {
        const { dayName, dayNameLabel } = componentStyles;
        const { typescale, ...rest } = dayNameLabel || {};

        return {
            dayNameStyle: dayName,
            textStyle: [rest, typescale],
        };
    }, [componentStyles]);

    return (
        <View style={dayNameStyle}>
            <Text style={textStyle} selectable={false}>
                {label}
            </Text>
        </View>
    );
}

export default memo(DayName);
