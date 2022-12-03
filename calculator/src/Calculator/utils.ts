
export type ColorModeType = 'dark' | 'light';



export type NumpadButtonTypes = {
    icon: string;
    type: BtnTypes;
    oper: string;
};

export const enum BtnTypes {
    NUMBER = 'NUMBER',
    CLEAR = 'CLEAR',
    OPERATOR = 'OPERATOR',
    EQUAL = 'EQUAL',
    POINT = 'POINT',
    BACK = 'BACK',
}



export const btnValues: NumpadButtonTypes[] = [
    {
        icon: 'AC',
        type: BtnTypes.CLEAR,
        oper: 'AC',
    },
    {
        icon: '',
        type: BtnTypes.NUMBER,
        oper: '',
    },
    {
        icon: '',
        type: BtnTypes.NUMBER,
        oper: '',
    },
    {
        icon: '÷',
        type: BtnTypes.OPERATOR,
        oper: '/',
    },
    {
        icon: '7',
        type: BtnTypes.NUMBER,
        oper: '7',
    },
    {
        icon: '8',
        type: BtnTypes.NUMBER,
        oper: '8',
    },
    {
        icon: '9',
        type: BtnTypes.NUMBER,
        oper: '9',
    },
    {
        icon: 'x',
        type: BtnTypes.OPERATOR,
        oper: '*',
    },
    {
        icon: '4',
        type: BtnTypes.NUMBER,
        oper: '4',
    },
    {
        icon: '5',
        type: BtnTypes.NUMBER,
        oper: '5',
    },
    {
        icon: '6',
        type: BtnTypes.NUMBER,
        oper: '6',
    },
    {
        icon: '-',
        type: BtnTypes.OPERATOR,
        oper: '-',
    },
    {
        icon: '1',
        type: BtnTypes.NUMBER,
        oper: '1',
    },
    {
        icon: '2',
        type: BtnTypes.NUMBER,
        oper: '2',
    },
    {
        icon: '3',
        type: BtnTypes.NUMBER,
        oper: '3',
    },
    {
        icon: '+',
        type: BtnTypes.OPERATOR,
        oper: '+',
    },
    {
        icon: '.',
        type: BtnTypes.POINT,
        oper: '.',
    },
    {
        icon: '0',
        type: BtnTypes.NUMBER,
        oper: '0',
    },
    {
        icon: '<-',
        type: BtnTypes.BACK,
        oper: '<-',
    },
    {
        icon: '=',
        type: BtnTypes.EQUAL,
        oper: '=',
    },
];
