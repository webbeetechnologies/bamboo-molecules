import React, { memo, useMemo, useCallback } from 'react';
import { useMolecules } from '../../../../src/hooks';
import doMath from '../Logic';

const screenFontSize = {
    calc: 30,
    history: 40,
};

type Props = {
    history: string;
    setHistory: React.Dispatch<React.SetStateAction<string>>;
    colorMode: string;
    setCalc: React.Dispatch<React.SetStateAction<number>>;
    calc: number;
};

const Screen = ({ calc, history, setHistory, colorMode, setCalc }: Props) => {
    const { Text, View, TextInput } = useMolecules();

    const result = useMemo(() => {
        if (history === '') {
            setCalc(0);
            return 0;
        }

        const result = doMath(history);
        if (typeof result === 'string') {
            return calc;
        }

        setCalc(() => result);
        if (result.toString() === history) {
            return 0;
        }
        return result;
    }, [history]);

    const onChangeHistory = useCallback((input: string) => {
        setHistory(input);
    }, []);

    const style: any = useMemo(
        () => ({
            viewStyle: {
                height: screenFontSize.history * 1.5 + screenFontSize.calc * 2,
                backgroundColor: colorMode === 'light' ? '#71a9b921' : '#2b2b2b',
                justifyContent: 'flex-end',
                padding: 10,
            },
            calcStyle: {
                fontSize: screenFontSize.calc,
                fontWeight: '600',
                textAlign: 'right',
                color: colorMode === 'light' ? '#000000' : '#ffffff',
                opacity: 0.6,
            },
            historyStyle: {
                backgroundColor: 'transparent',
                fontSize: screenFontSize.history,
                textAlign: 'right',
                color: colorMode === 'light' ? '#000000' : '#ffffff',

                padding: 0,
                flex: 1,
            },
        }),
        [colorMode],
    );

    const resultValue = useMemo(() => (result !== 0 ? result : ''), [result]);

    return (
        <View style={style.viewStyle}>
            <TextInput
                inputStyle={style.historyStyle}
                inputContainerStyle={someBasicStyleTextInput.inputContainerStyle}
                keyboardType="decimal-pad"
                numberOfLines={1}
                style={someBasicStyleTextInput.style}
                placeholder={'0'}
                value={history}
                onChangeText={onChangeHistory}
                underlineColor="rgba(0,0,0,0)"
                activeUnderlineColor="rgba(0,0,0,0)"
            />

            <Text numberOfLines={1} adjustsFontSizeToFit style={style.calcStyle}>
                {resultValue}
            </Text>
        </View>
    );
};

export default memo(Screen);

const someBasicStyleTextInput = {
    inputContainerStyle: {
        flex: 1,
    },
    style: {
        backgroundColor: 'transparent',
    },
};
