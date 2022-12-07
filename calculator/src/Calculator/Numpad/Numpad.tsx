import React, { memo, useCallback } from 'react';
import { BtnTypes, btnValues } from '../utils';
import doMath from '../Logic';
import NumpadButton from './NumpadButton';
import { useMolecules } from '../../../App';

export type Props = {
    setHistory: React.Dispatch<React.SetStateAction<string>>;
};
const Numpad = ({ setHistory }: Props) => {
    const { FlatGrid, View, NumpadContainer } = useMolecules();

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
        <NumpadContainer>
            <FlatGrid
                data={btnValues}
                renderItem={({ item }) =>
                    item.type !== BtnTypes.SPACE ? (
                        <NumpadButton item={item} handleBtnClick={handleBtnClick} />
                    ) : (
                        <View />
                    )
                }
                spacing={10}
                maxItemsPerRow={4}
                itemDimension={0}
            />
        </NumpadContainer>
    );
};

export default memo(Numpad);
