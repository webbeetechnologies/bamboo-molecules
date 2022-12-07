import React, { memo, useMemo, useCallback } from 'react';
import { useMolecules } from '../../../App';
import doMath from '../Logic';

type Props = {
    history: string;
    setHistory: React.Dispatch<React.SetStateAction<string>>;
};

const Screen = ({ history, setHistory }: Props) => {
    const { ScreenContainer, HistoryCalInput, ResultText } = useMolecules();

    const result = useMemo(() => {
        if (history === '') {
            return 0;
        }

        const result = doMath(history);

        if (result.toString() === history) {
            return 0;
        }
        return result;
    }, [history]);

    const onChangeHistory = useCallback((input: string) => {
        setHistory(input);
    }, []);

    const resultValue = useMemo(() => (result !== 0 ? result : ''), [result]);

    return (
        <ScreenContainer>
            <HistoryCalInput
                placeholder={'0'}
                value={history}
                onChangeText={onChangeHistory}
                underlineColor="rgba(0,0,0,0)"
                activeUnderlineColor="rgba(0,0,0,0)"
            />
            <ResultText>{resultValue}</ResultText>
        </ScreenContainer>
    );
};

export default memo(Screen);
