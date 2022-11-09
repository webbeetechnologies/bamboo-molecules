import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useMolecules, useCurrentTheme } from '../../../../hooks';
import { useMemo } from 'react';

function DayName({ label }: { label: string }) {
    const theme = useCurrentTheme();
    const { Text } = useMolecules();

    const { textStyle } = useMemo(() => {
        return {
            textStyle: [styles.dayNameLabel, theme.typescale.bodyMedium],
        };
    }, [theme.typescale.bodyMedium]);

    return (
        <View style={styles.dayName}>
            <Text style={textStyle} selectable={false}>
                {label}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    dayName: { flex: 1, alignItems: 'center' },
    dayNameLabel: { fontSize: 14, opacity: 0.7 },
});
export default React.memo(DayName);
