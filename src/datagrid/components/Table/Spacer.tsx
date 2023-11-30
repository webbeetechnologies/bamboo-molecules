import { ComponentType, memo, useEffect, useMemo, useRef } from 'react';
import { useComponentStyles, useDataTable, useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataTableRowProps } from '@bambooapp/bamboo-molecules';
import {
    useGroupRowState,
    useTableManagerValueSelector,
    useGroupMeta,
    useHasGroupedData,
    useFindRecordWithIndex,
} from '../../contexts';
import { isGroupHeader, GroupHeader } from '../../utils';
import { useCellFocusMethods, useDragAndExtendMethods } from '@bambooapp/bamboo-molecules/datagrid';

type SpacerProp = { variant: 'left' | 'right'; isLastLevel?: boolean };

const Spacer = memo((props: SpacerProp & { edge: boolean }) => {
    const { View } = useMolecules();

    const spacerWidth = useTableManagerValueSelector(store => store.spacerWidth);
    const variant = props.edge ? `${props.variant}-edge` : props.variant;

    const spacer = useComponentStyles(
        'DataGrid_Spacer',
        { width: spacerWidth, minHeight: props.isLastLevel ? undefined : spacerWidth },
        { variant },
    );

    return <View style={spacer} />;
});

export const SpacerList = memo((props: SpacerProp & { level: number; edgeIndex: number }) => {
    return (
        <>
            {Array.from({ length: props.level }, (_, i) => (
                <Spacer
                    key={i + ''}
                    variant={props.variant}
                    edge={i === props.edgeIndex}
                    isLastLevel={props.isLastLevel}
                />
            ))}
        </>
    );
});

const rowTypes = {
    header: 'DataGrid_GroupHeaderItem',
    footer: 'DataGrid_GroupFooterItem',
    data: 'DataGrid_RowItem',
};

const useBoolean = () => false;
const emptyObj = {};

export const withSpacers = (Component: ComponentType<DataTableRowProps>) => {
    const SpacedComponent = memo(({ style: styleProp, rowId, ...props }: DataTableRowProps) => {
        const groupRow = useFindRecordWithIndex(props.index);
        const { level, rowType: variant } = groupRow;

        const isGroupsEnabled = useHasGroupedData();

        const isFirstRender = useRef(true);
        const virtualListRef = useDataTable(store => store.virtualListRef);
        const { useIsRowFocused } = useCellFocusMethods();
        const { useIsDragHandleVisibleRow = useBoolean } = useDragAndExtendMethods() || emptyObj;

        const isRowFocused = useIsRowFocused(props.index);
        const isDragHandleVisibleOnRow = useIsDragHandleVisibleRow({ rowIndex: props.index });
        const isRowElevated = isRowFocused || isDragHandleVisibleOnRow;

        const spacerWidth = useTableManagerValueSelector(store => store.spacerWidth);

        const groupSpacerWrapStyles = useComponentStyles(
            'DataGrid_SpacerRow',
            [styleProp, isRowElevated && { zIndex: 9 }],
            {
                variant,
                states: {
                    isFirstGroup: props.index === 0 && isGroupsEnabled,
                },
            },
        );

        const { View, If } = useMolecules();

        const groupMeta = useGroupMeta(props.index);
        const isDataRowHeader = isGroupHeader(groupRow) && groupRow.isLastLevel;

        const style = useComponentStyles(
            rowTypes[variant],
            [
                props.rowProps?.style,
                isGroupsEnabled && level === 0 ? { minHeight: spacerWidth } : null,
                { flex: 1 },
                groupMeta.isRealGroup === false
                    ? { borderLeftWidth: 0, borderRightWidth: 0 }
                    : null,
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
            () => ({ ...props.rowProps, style: [props.rowProps?.style, style] }),
            [style, props.rowProps],
        );

        useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
            }

            virtualListRef.current.resetAfterIndex(0);
        }, [isRowElevated, isGroupsEnabled, virtualListRef]);

        return (
            <View style={groupSpacerWrapStyles}>
                <If shouldRender={isGroupsEnabled}>
                    <SpacerList
                        edgeIndex={0}
                        level={level}
                        variant="left"
                        isLastLevel={groupMeta.isLastLevel}
                    />
                </If>
                <Component {...props} rowId={rowId} rowProps={rowProps} />
                <If shouldRender={isGroupsEnabled}>
                    <SpacerList
                        edgeIndex={level - 1}
                        level={level}
                        variant="right"
                        isLastLevel={groupMeta.isLastLevel}
                    />
                </If>
            </View>
        );
    });

    SpacedComponent.displayName = (Component.displayName || '') + 'WithSpacers';

    return SpacedComponent;
};
