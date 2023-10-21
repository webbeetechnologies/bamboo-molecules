import { ComponentType, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataTableRowProps } from '@bambooapp/bamboo-molecules';
import {
    useGroupRowState,
    useTableManagerValueSelector,
    useGroupMeta,
    useHasGroupedData,
    useFindRecordWithIndex,
} from '../../contexts';
import { isGroupHeader, GroupHeader } from '../../utils';

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
    const SpacedComponent = memo(({ style: styleProp, rowId, ...props }: DataTableRowProps) => {
        const groupRow = useFindRecordWithIndex(props.index);
        const { level, rowType: variant } = groupRow;

        const isGroupsEnabled = useHasGroupedData();

        const spacerWidth = useTableManagerValueSelector(store => store.spacerWidth);

        const groupSpacerWrapStyles = useComponentStyles('DataGrid_SpacerRow', styleProp, {
            variant,
            states: {
                isFirstGroup: props.index === 0,
            },
        });

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
