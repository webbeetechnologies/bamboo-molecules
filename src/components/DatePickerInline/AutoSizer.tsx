import { useState, useCallback, useMemo } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { useMolecules } from '../../hooks';

type WidthAndHeight = {
    width: number;
    height: number;
};

export default function AutoSizer({
    children,
}: {
    children: ({ width, height }: WidthAndHeight) => any;
}) {
    const { View } = useMolecules();
    const [layout, setLayout] = useState<WidthAndHeight | null>(null);

    const onLayout = useCallback(
        (event: LayoutChangeEvent) => {
            const nl = event.nativeEvent.layout;

            // https://github.com/necolas/react-native-web/issues/1704
            if (!layout || layout.width !== nl.width || layout.height !== nl.height) {
                setLayout({ width: nl.width, height: nl.height });
            }
        },
        [layout, setLayout],
    );

    const { autoSizerStyle } = useMemo(() => {
        return {
            autoSizerStyle: [styles.autoSizer, layout && layout],
        };
    }, [layout]);

    return (
        <View style={autoSizerStyle} onLayout={onLayout}>
            <>{layout ? children(layout) : null}</>
        </View>
    );
}

const styles = StyleSheet.create({
    autoSizer: {
        flex: 1,
        overflow: 'hidden',
    },
});
