import { FlatList } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { BtnTypes, NumpadButtonTypes, NumpadProps } from '../types';
import doMath from '../Logic';
import NumpadButton from './NumpadButton';

const btnValues: NumpadButtonTypes[] = [
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

const Numpad = ({ setHistory }: NumpadProps) => {
    // const { Button, FlatGrid, Text } = useMolecules();

    const handleBtnClick = useCallback((val: string) => {
        if (val === '') return;
        switch (val) {
            case 'AC':
                setHistory('');
                break;
            case '<-':
                setHistory(prev => prev.slice(0, -1));
                break;
            case '.':
                setHistory(prev => {
                    if (prev === '') {
                        return '0.';
                    } else {
                        return `${prev}.`;
                    }
                });
                break;

            case '/':
                setHistory(prev => {
                    if (prev === '') return '';

                    if (prev !== '') {
                        const a = prev.split(/[*\-+%/()]+/g);
                        if (a.length === 1) {
                            return `${prev}${val}`;
                        } else {
                            if (a[a.length - 1] === '') {
                                return prev;
                            } else {
                                return `${prev}${val}`;
                            }
                        }
                    } else {
                        return '';
                    }
                });

                break;
            case '+':
                setHistory(prev => {
                    if (prev === '') return val;

                    if (prev !== '') {
                        const a = prev.split(/[\-+()]+/g);
                        if (a.length === 1) {
                            return `${prev}${val}`;
                        } else {
                            if (a[a.length - 1] === '') {
                                return prev;
                            } else {
                                return `${prev}${val}`;
                            }
                        }
                    } else {
                        return '';
                    }
                });

                break;
            case '-':
                setHistory(prev => {
                    if (prev === '') return val;

                    if (prev !== '') {
                        const a = prev.split(/[\-+()]+/g);
                        if (a.length === 1) {
                            return `${prev}${val}`;
                        } else {
                            if (a[a.length - 1] === '') {
                                return prev;
                            } else {
                                return `${prev}${val}`;
                            }
                        }
                    } else {
                        return '';
                    }
                });

                break;
            case '*':
                setHistory(prev => {
                    if (prev === '') return '';

                    if (prev !== '') {
                        const a = prev.split(/[*\-+%/()]+/g);
                        if (a.length === 1) {
                            return `${prev}${val}`;
                        } else {
                            if (a[a.length - 1] === '') {
                                return prev;
                            } else {
                                return `${prev}${val}`;
                            }
                        }
                    } else {
                        return '';
                    }
                });

                break;

            case '0':
                setHistory(prev => (prev === '' || prev === '0' ? prev : prev + val));
                break;

            case '=':
                setHistory(prev => {
                    const result = doMath(prev);
                    if (typeof result === 'string') {
                        return prev;
                    }
                    return result.toString();
                });
                break;
            default:
                setHistory(prev => prev + val);
                break;
        }
    }, []);

    return (
        <FlatList
            numColumns={4}
            data={btnValues}
            renderItem={({ item, index }) => (
                <NumpadButton item={item} handleBtnClick={handleBtnClick} />
            )}
            keyExtractor={(item, index) => `btn-${index}`}
            contentContainerStyle={{
                padding: 5,
            }}
        />
    );

    // return (
    //     <FlatGrid
    //         numColumns={4}
    //         data={btnValues}
    //         renderItem={({ item, index }) => (
    //             <Button variant="contained" key={index} onPress={() => handleBtnClick(item)}>
    //                 {item}
    //             </Button>
    //         )}
    //         keyExtractor={(item, index) => `btn-${index}`}
    //     />
    // );
};

export default memo(Numpad);
