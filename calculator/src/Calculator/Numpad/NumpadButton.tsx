import React, { memo, useMemo } from 'react';
import { useMolecules } from '../../../App';

import { BtnTypes, NumpadButtonType } from '../utils';

type Props = {
    item: NumpadButtonType;
    handleBtnClick: (item: NumpadButtonType) => void;
};

const NumpadButton = memo(({ item, handleBtnClick }: Props) => {
    const { Button } = useMolecules();

    const variant = useMemo(() => {
        switch (item.type) {
            case BtnTypes.OPERATOR:
                return 'secondary';
            case BtnTypes.CLEAR:
                return 'clear';
            case BtnTypes.EQUAL:
                return 'equal';

            default:
                return 'primary';
        }
    }, []);

    return (
        <Button
            // @ts-ignore
            size="xl"
            // @ts-ignore
            variant={variant}
            onPress={() => handleBtnClick(item)}
            style={{
                aspectRatio: 1,
            }}
            labelStyle={{
                marginHorizontal: 0,
            }}>
            {item.icon}
        </Button>
    );
});
export default memo(NumpadButton);
