import { ComponentType, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataTableRowProps } from '@bambooapp/bamboo-molecules';
import {
    useRecordById,
    useGroupRowState,
    useTableManagerValueSelector,
    useGroupMeta,
    useHasGroupedData,
} from '../../contexts';
import { isGroupFooter, GroupedData, isGroupHeader, GroupHeader } from '../../utils';

type SpacerProp = { variant: 'left' | 'right'; isLastLevel?: boolean };

const Spacer = (props: SpacerProp) => {
    const { View } = useMolecules();

    const spacerWidth = useTableManagerValueSelector(store => store.spacerWidth);

    const spacer = useComponentStyles(
        'DataGrid_Spacer',
        { width: spacerWidth, minHeight: props.isLastLevel ? undefined : spacerWidth },
        {
            variant: props.variant,
        },
    );

    return <View style={spacer} />;
};

export const SpacerList = memo((props: SpacerProp & { level: number }) => {
    const spaces = useMemo(
        () =>
            Array.from({ length: props.level }, (_, i) => (
                <Spacer key={i + ''} variant={props.variant} isLastLevel={props.isLastLevel} />
            )),
        [props.variant, props.isLastLevel, props.level],
    );

    return <>{spaces}</>;
});

const useGroupVariant = (groupRow: GroupedData) => {
    if (isGroupHeader(groupRow)) return 'header';
    if (isGroupFooter(groupRow)) return 'footer';
    return 'cell';
};

const rowTypes = {
    header: 'DataGrid_GroupHeaderItem',
    footer: 'DataGrid_GroupFooterItem',
    cell: 'DataGrid_RowItem',
};

export const withSpacers = (Component: ComponentType<DataTableRowProps>) => {
    const SpacedComponent = memo((props: DataTableRowProps) => {
        const groupRow = useRecordById(props.rowId) as GroupedData;
        const variant = useGroupVariant(groupRow);

        const isGroupsEnabled = useHasGroupedData(props.rowId);

        const groupSpacerWrapStyles = useComponentStyles('DataGrid_SpacerRow', null, {
            variant,
        });

        const { View } = useMolecules();

        const { level } = groupRow;

        const groupMeta = useGroupMeta(props.rowId);
        const isDataRowHeader = isGroupHeader(groupRow) && groupRow.isLastLevel;
        const style = useComponentStyles(rowTypes[variant], props.rowProps?.style, {
            states: {
                isDataRowHeaderFirst: isDataRowHeader && (groupRow as GroupHeader).isFirst,
                isDataRowHeader: isDataRowHeader,
                isFirstGroup: props.index === 0,
                ...useGroupRowState(groupMeta),
            },
        });

        const rowProps = useMemo(
            () => ({ ...props.rowProps, style: [props.rowProps, style] }),
            [style, props.rowProps],
        );

        if (!isGroupsEnabled) {
            return <Component {...props} rowProps={rowProps} />;
        }

        return (
            <View style={groupSpacerWrapStyles}>
                <SpacerList level={level} variant="left" isLastLevel={groupMeta.isLastLevel} />
                <Component {...props} rowProps={rowProps} />
                <SpacerList level={level} variant="right" isLastLevel={groupMeta.isLastLevel} />
            </View>
        );
    });

    SpacedComponent.displayName = (Component.displayName || '') + 'WithSpacers';

    return SpacedComponent;
};
