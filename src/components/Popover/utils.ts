import {MutableRefObject, ReactElement, createContext} from 'react';

import type {ComponentStylePropWithVariants} from '../../types';
import {Platform, StyleSheet, ViewStyle} from 'react-native';
import type {TPopoverContext} from './types';

type States = ''; // 'disabled' | 'hovered' | 'pressed';
type CustomProps = {
    // labelColor: string
    // checkedColor: string;
};


export const PopoverContext = createContext<TPopoverContext>({
    onClose: () => {
    },
    initialFocusRef: {current: null} as MutableRefObject<ReactElement | null> | undefined,
    finalFocusRef: {current: null} as MutableRefObject<ReactElement | null> | undefined,
    popoverContentId: undefined as string | undefined,
    headerId: undefined as string | undefined,
    bodyId: undefined as string | undefined,
    setHeaderMounted: (_value: boolean) => {
    },
    setBodyMounted: (_value: boolean) => {
    },
    headerMounted: false as boolean,
    bodyMounted: false as boolean,
});


export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {};

export const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    initialTransition: {opacity: 0,},
    animateTransition: {opacity: 1, transition: {duration: 150}},
    exitTransition: {opacity: 0, scale: 0.95, transition: {duration: 100}}
});
