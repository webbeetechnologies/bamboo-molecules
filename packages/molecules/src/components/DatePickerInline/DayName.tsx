import { memo } from 'react';
import { Text, View } from 'react-native';
import { dateDayNameStyles } from './utils';

function DayName({ label }: { label: string }) {
    return (
        <View style={dateDayNameStyles.dayName}>
            <Text style={dateDayNameStyles.dayName} selectable={false}>
                {label}
            </Text>
        </View>
    );
}

export default memo(DayName);
