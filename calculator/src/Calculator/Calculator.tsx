import React, { useState, useEffect, memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useMolecules } from '../../../src/hooks';

import doMath from './Logic';
import Numpad from './Numpad';
import Screen from './Screen';
import type { ColorModeType } from './utils';

export type Props = {
    style?: StyleProp<ViewStyle>;
    onChange?: (calc: number) => void;
    colorMode?: ColorModeType;
};



const Calculator = (props: Props) => {
    const { style, onChange, colorMode = 'light' } = props;

    const { View } = useMolecules();

    const [history, setHistory] = useState('');
    const [calc, setCalc] = useState(0);

    useEffect(() => {
        if (history === '') {
            setCalc(0);
            return;
        }
        const result = doMath(history);
        if (typeof result === 'string') {
            return;
        }

        setCalc(() => result);
    }, [history]);

    useEffect(() => {
        onChange?.(calc);
    }, [calc]);

    return (
        <View style={style}>
            <Screen colorMode={colorMode} calc={calc} history={history} setHistory={setHistory} />
            <Numpad setHistory={setHistory} colorMode={colorMode} />
        </View>
    );
};

export default memo(Calculator);
