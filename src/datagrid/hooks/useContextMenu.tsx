import { MutableRefObject, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useShouldContextMenuDisplayed } from '../contexts';

export type Props = {
    ref: MutableRefObject<any>;
    callback: (e: any) => void;
};

const useContextMenu = ({ ref, callback }: Props) => {
    const callbackRef = useRef(callback);
    const shouldContextMenuDisplayed = useShouldContextMenuDisplayed();

    useEffect(() => {
        if (Platform.OS !== 'web' || !shouldContextMenuDisplayed) return;

        const triggerElement = ref.current;
        const callbackFunc = callbackRef.current;

        triggerElement?.addEventListener('contextmenu', callbackFunc);

        return () => {
            triggerElement?.removeEventListener('contextmenu', callbackFunc);
        };
    }, [callback, ref, shouldContextMenuDisplayed]);
};

export default useContextMenu;
