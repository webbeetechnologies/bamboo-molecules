import React, { useState, useEffect, memo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useMolecules } from '../../../src/hooks';
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

    useEffect(() => {}, [history]);

    useEffect(() => {
        onChange?.(calc);
    }, [calc]);

    return (
        <View style={style}>
            <Screen
                setCalc={setCalc}
                colorMode={colorMode}
                history={history}
                setHistory={setHistory}
                calc={calc}
            />
            <Numpad setHistory={setHistory} colorMode={colorMode} />
        </View>
    );
};

export default memo(Calculator);
