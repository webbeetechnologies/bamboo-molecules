import React, { useState, useEffect } from 'react';
import { useMolecules } from '../../../src/hooks';

import doMath from './Logic';
import Numpad from './Numpad';
import Screen from './Screen';
import type { CalculatorType } from './types';

const Calculator = ({ style }: CalculatorType) => {
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

    return (
        <View style={style}>
            <Screen calc={calc} history={history} setHistory={setHistory} />
            <Numpad setHistory={setHistory} />
        </View>
    );
};

export default Calculator;
