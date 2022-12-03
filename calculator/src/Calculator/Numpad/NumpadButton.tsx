import { TouchableOpacity } from 'react-native';
import React, { memo, useMemo } from 'react';
import { useMolecules } from 'bamboo-molecules';
import { BtnTypes, NumpadButtonProps } from '../types';

const NumpadButton = memo(({ item, handleBtnClick }: NumpadButtonProps) => {
    const { Text } = useMolecules();

    const getBackgroundColor = () => {
        switch (item.type) {
            case BtnTypes.OPERATOR:
                return '#80d7ff';
            case BtnTypes.CLEAR:
                return '#ff8080';
            case BtnTypes.EQUAL:
                return '#80ffb4';

            default:
                return '#80d7ff20';
        }
    };
    const numpadButtonStyle: any = useMemo(() => {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            padding: 5,
            aspectRatio: 1,
            borderRadius: 1000,
            backgroundColor: getBackgroundColor(),
        };
    }, []);

    return (
        <TouchableOpacity style={numpadButtonStyle} onPress={() => handleBtnClick(item.oper)}>
            <Text
                adjustsFontSizeToFit
                style={{
                    fontSize: 22,
                    fontWeight: '600',
                }}>
                {item.icon}
            </Text>
        </TouchableOpacity>
    );
});
export default NumpadButton;
