import type { StyleProp, ViewStyle } from 'react-native';

export type CalculatorType = {
    style: StyleProp<ViewStyle>;
};

export interface ScreenProps {
    calc: number;
    history: string;
    setHistory: React.Dispatch<React.SetStateAction<string>>;
}

export interface NumpadProps {
    setHistory: React.Dispatch<React.SetStateAction<string>>;
}

export interface NumpadButtonTypes {
    icon: string;
    type: BtnTypes;
    oper: string;
}
export interface NumpadButtonProps {
    item: {
        icon: string;
        type: BtnTypes;
        oper: string;
    };
    handleBtnClick: (val: string) => void;
}

export const enum BtnTypes {
    NUMBER = 'NUMBER',
    CLEAR = 'CLEAR',
    OPERATOR = 'OPERATOR',
    EQUAL = 'EQUAL',
    POINT = 'POINT',
    BACK = 'BACK',
}
