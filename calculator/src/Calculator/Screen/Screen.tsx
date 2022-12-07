import React, { memo, useMemo, useCallback } from 'react';
import { useMolecules } from '../../../App';
import doMath from '../Logic';

type Props = {
    history: string;
    setHistory: (val: string) => void;
};

const Screen = ({ history, setHistory }: Props) => {
    const { ScreenContainer, HistoryCalInput, ResultText } = useMolecules();

    const result = useMemo(() => {
        if (history === '') return '';
        
        const calc = doMath(history);

        if (calc.toString() === history) {
            return '';
        }
        return calc;
    }, [history]);

    const onChangeHistory = useCallback((input: string) => {
        setHistory(input);
    }, []);

    return (
        <ScreenContainer>
            <HistoryCalInput value={history} onChangeText={onChangeHistory} />
            <ResultText>{result}</ResultText>
        </ScreenContainer>
    );
};

export default memo(Screen);
