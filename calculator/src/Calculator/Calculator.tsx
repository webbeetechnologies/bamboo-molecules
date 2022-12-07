import React, { useState, memo } from 'react';
import { useMolecules } from '../../../src/hooks';
import { Numpad } from './Numpad';

import { Screen } from './Screen';

const Calculator = () => {
    const { View } = useMolecules();

    const [history, setHistory] = useState('');

    return (
        <View>
            <Screen history={history} setHistory={setHistory} />
            <Numpad history={history} setHistory={setHistory} />
        </View>
    );
};

export default memo(Calculator);
