import {
    StateLayerProps,
    registerMolecule,
    useComponentStyles,
    useDataTableCell,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { memo } from 'react';

export type Props = StateLayerProps & {
    isFocused: boolean;
    columnIndex: number;
    rowIndex: number;
};

const CellBorder = ({ style, isFocused, columnIndex, ...rest }: Props) => {
    const { StateLayer } = useMolecules();

    const { isLast } = useDataTableCell();

    const borderStyle = useComponentStyles('DataGrid_CellBorder', [style], {
        variant: columnIndex === 0 ? 'first' : isLast ? 'last' : '',
        states: {
            focused: isFocused,
        },
    });

    return <StateLayer style={borderStyle} {...rest} />;
};

registerMolecule('CellBorder', {
    Component: memo(CellBorder),
    defaultStyles: {
        DataGrid_CellBorder: {
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'colors.outlineVariant',
            variants: {
                first: { borderLeftWidth: 1 },
            },
            states: {
                focused: {
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    borderBottomWidth: 2,
                    borderTopWidth: 2,
                    borderRadius: 2,
                    borderColor: 'blue',
                    backgroundColor: 'colors.surface',
                },
            },
        },
    },
});

export default memo(CellBorder);

declare global {
    namespace BambooMolecules {
        interface Components {
            CellBorder: typeof CellBorder;
        }
    }
}
