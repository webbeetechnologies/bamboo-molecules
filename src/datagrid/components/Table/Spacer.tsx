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
import { GroupedData, isGroupHeader, GroupHeader } from '../../utils';

type SpacerProp = { variant: 'left' | 'right'; isLastLevel?: boolean };

const Spacer = (props: SpacerProp & { edge: boolean }) => {
    const { View } = useMolecules();

    const spacerWidth = useTableManagerValueSelector(store => store.spacerWidth);
    const variant = props.edge ? `${props.variant}-edge` : props.variant;

    const spacer = useComponentStyles(
        'DataGrid_Spacer',
        { width: spacerWidth, minHeight: props.isLastLevel ? undefined : spacerWidth },
        { variant },
    );

    return <View style={spacer} />;
};

export const SpacerList = memo((props: SpacerProp & { level: number; edgeIndex: number }) => {
    const spaces = useMemo(
        () =>
            Array.from({ length: props.level }, (_, i) => (
                <Spacer
                    key={i + ''}
                    variant={props.variant}
                    edge={i === props.edgeIndex}
                    isLastLevel={props.isLastLevel}
                />
            )),
        [props.variant, props.edgeIndex, props.isLastLevel, props.level],
    );

    return <>{spaces}</>;
});

const rowTypes = {
    header: 'DataGrid_GroupHeaderItem',
    footer: 'DataGrid_GroupFooterItem',
    data: 'DataGrid_RowItem',
};

export const withSpacers = (Component: ComponentType<DataTableRowProps>) => {
    const SpacedComponent = memo((props: DataTableRowProps) => {
        const groupRow = useRecordById(props.rowId) as GroupedData;
        const { level, rowType: variant } = groupRow;

        const isGroupsEnabled = useHasGroupedData();

        const spacerWidth = useTableManagerValueSelector(store => store.spacerWidth);

        const groupSpacerWrapStyles = useComponentStyles('DataGrid_SpacerRow', null, {
            variant,
            states: {
                isFirstGroup: props.index === 0,
            },
        });

        const { View } = useMolecules();

        const groupMeta = useGroupMeta(props.rowId);
        const isDataRowHeader = isGroupHeader(groupRow) && groupRow.isLastLevel;

        const style = useComponentStyles(
            rowTypes[variant],
            [
                props.rowProps?.style,
                isGroupsEnabled && level === 0 ? { minHeight: spacerWidth } : null,
                !groupMeta.isRealGroup ? { borderLeftWidth: 0, borderRightWidth: 0 } : null,
            ],
            {
                states: {
                    isDataRowHeaderFirst: isDataRowHeader && (groupRow as GroupHeader).isFirst,
                    isDataRowHeader: isDataRowHeader,
                    ...useGroupRowState(groupMeta),
                },
            },
        );

        const rowProps = useMemo(
            () => ({ ...props.rowProps, style: [props.rowProps, style] }),
            [style, props.rowProps],
        );

        if (!isGroupsEnabled) {
            return <Component {...props} rowProps={rowProps} />;
        }

        return (
            <View style={groupSpacerWrapStyles}>
                <SpacerList
                    edgeIndex={0}
                    level={level}
                    variant="left"
                    isLastLevel={groupMeta.isLastLevel}
                />
                <Component {...props} rowProps={rowProps} />
                <SpacerList
                    edgeIndex={level - 1}
                    level={level}
                    variant="right"
                    isLastLevel={groupMeta.isLastLevel}
                />
            </View>
        );
    });

    SpacedComponent.displayName = (Component.displayName || '') + 'WithSpacers';

    return SpacedComponent;
};
