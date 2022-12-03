import { StyleSheet, TextInput } from 'react-native';
import React, { memo, useMemo, useCallback } from 'react';
import type { ScreenProps } from '../types';
import { useMolecules } from '../../../../src/hooks';

const screenFontSize = {
    calc: 30,
    history: 40,
};

const Screen = ({ calc, history, setHistory }: ScreenProps) => {
    const { Text, View } = useMolecules();

    const result = useMemo(() => {
        console.log(`calc: ${calc} || hist: ${history}`);
        console.log(calc.toString() === history);
        if (calc.toString() === history) {
            return 0;
        }
        return calc;
    }, [calc, history]);

    const onChangeHistory = useCallback((input: string) => {
        setHistory(input);
    }, []);

    return (
        <View style={Style.screen}>
            <TextInput
                keyboardType="decimal-pad"
                numberOfLines={1}
                style={{
                    fontSize: screenFontSize.history,

                    textAlign: 'right',
                }}
                value={history === '' ? '0' : history}
                onChangeText={onChangeHistory}
            />

            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                    fontSize: screenFontSize.calc,
                    fontWeight: '600',
                    textAlign: 'right',
                    opacity: 0.6,
                }}>
                {result !== 0 ? result : ''}
            </Text>
        </View>
    );
};

export default memo(Screen);

const Style = StyleSheet.create({
    screen: {
        height: screenFontSize.history * 1.5 + screenFontSize.calc * 2,
        backgroundColor: '#71a9b921',
        justifyContent: 'flex-end',
        padding: 10,
    },
});
