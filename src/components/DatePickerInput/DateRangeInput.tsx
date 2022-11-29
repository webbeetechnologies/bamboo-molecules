import { useState, useCallback } from 'react';

import { useMolecules } from '../../hooks';
import DatePickerModal from '../DatePickerModal/DatePickerModal';

// WORK IN PROGRESS
export default function DateRangeInput({
    locale,
    calendarIcon = 'calendar',
}: {
    locale: string;
    calendarIcon?: string;
}) {
    const { Text, IconButton, View } = useMolecules();
    const [visible, setVisible] = useState<boolean>(false);
    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    const onConfirm = useCallback(
        ({ startDate, endDate }: { startDate: any; endDate: any }) => {
            setVisible(false);
            // eslint-disable-next-line no-console
            console.log({ startDate, endDate });
        },
        [setVisible],
    );

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
                {/*<DatePickerInput*/}
                {/*  value={''}*/}
                {/*  keyboardType={'numeric'}*/}
                {/*  placeholder={'DD-MM-YYY'}*/}
                {/*  mask={'DD-MM-YYY'}*/}
                {/*  onChangeText={() => {}}*/}
                {/*/>*/}
                <Text>Van</Text>
            </View>
            <View>
                <Text style={{ fontSize: 16, marginLeft: 12, marginRight: 12 }}>to</Text>
                <Text style={{ opacity: 0 }} accessible={false}>
                    tot
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                {/*<DatePickerInput*/}
                {/*  // value={''}*/}
                {/*  // keyboardType={'numeric'}*/}
                {/*  // placeholder={'DD-MM-YYY'}*/}
                {/*  // mask={'DD-MM-YYY'}*/}
                {/*  // onChangeText={() => {}}*/}
                {/*/>*/}
                <Text>Tot</Text>
            </View>
            <View>
                <IconButton name={calendarIcon} onPress={() => setVisible(true)} />
                <Text style={{ opacity: 0 }} accessible={false}>
                    tot
                </Text>
            </View>
            <DatePickerModal
                locale={locale}
                mode="range"
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                startDate={undefined}
                endDate={undefined}
            />
        </View>
    );
}
