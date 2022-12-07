import React, { memo, useCallback } from 'react';
import { BtnTypes, btnValues, NumpadButtonType, NumpadButtonTypes } from '../utils';
import { valHistory } from '../Logic';
import NumpadButton from './NumpadButton';
import { useMolecules } from '../../../App';

export type Props = {
    setHistory: (val: string) => void;
    history: string;
};

const Numpad = ({ setHistory, history }: Props) => {
    const { FlatGrid, View, NumpadContainer } = useMolecules();

    const handleBtnClick = useCallback(
        (btn: NumpadButtonType) => {
            setHistory(valHistory(history, btn));
        },
        [history, setHistory],
    );

    const RenderNumPadBtn = useCallback(
        ({ item }: { item: NumpadButtonTypes }) => {
            return item.type !== BtnTypes.SPACE ? (
                <NumpadButton item={item} handleBtnClick={handleBtnClick} />
            ) : (
                <View />
            );
        },
        [handleBtnClick],
    );

    return (
        <NumpadContainer>
            <FlatGrid
                data={btnValues}
                renderItem={RenderNumPadBtn}
                spacing={10}
                maxItemsPerRow={4}
                itemDimension={0}
            />
        </NumpadContainer>
    );
};

export default memo(Numpad);
