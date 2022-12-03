import React, { memo, useMemo } from 'react';
import { useCurrentTheme, useMolecules } from '../../../../src/hooks';

import { BtnTypes, ColorModeType } from '../utils';

type Props = {
    item: {
        icon: string;
        type: BtnTypes;
        oper: string;
    };
    handleBtnClick: (val: string) => void;
    colorMode: ColorModeType;
};

const NumpadButton = memo(({ item, handleBtnClick ,colorMode}: Props) => {
    const { Button } = useMolecules();

    const { colors } = useCurrentTheme();

    
    const getBtnColor = useMemo(() => {
        
        switch (item.type) {
            case BtnTypes.OPERATOR:
                return '#80d7ff';
            case BtnTypes.CLEAR:
                return '#ff8080';
            case BtnTypes.EQUAL:
                return '#80ffb4';

            default:
                return colors.primary ;
        }
    }, [colorMode]);

    const numpadButtonStyle: object = useMemo(() => {
        return {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            aspectRatio: 1,
            borderRadius: 1000,
            backgroundColor: getBtnColor,
        };
    }, []);

    const labelStyle: object = useMemo(() => {
        return {
            fontSize: 22,
            fontWeight: '600',
            color: colorMode === 'light' ? '#000000a0' : '#ffffff'  ,
        };
    }, [colorMode]);
    return (
        <Button
            variant="contained"
            style={numpadButtonStyle}
            onPress={() => handleBtnClick(item.oper)}
            labelStyle={labelStyle}>
            {item.icon}
        </Button>
    );
});
export default memo(NumpadButton);
