import { ComponentType, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import type { DataTableRowProps } from '@bambooapp/bamboo-molecules';
import { useGroupMeta, useRecordById, useGroupRowState, useShowGroupFooter } from '../../contexts';
import type { GroupFooter, GroupHeader, GroupedData } from 'src/datagrid/utils';

type SpacerProp = { variant: 'left' | 'right' };

const Spacer = (props: SpacerProp & { edge: boolean }) => {
    const { View } = useMolecules();

    const spacer = useComponentStyles('DataGrid_Spacer', null, {
        variant: props.variant,
    });

    // if (props.edge) return null;

    return <View style={spacer} />;
};

export const SpacerList = memo((props: SpacerProp & { level: number }) => {
    const spaces = useMemo(
        () =>
            Array.from({ length: props.level }, (_, i) => (
                <Spacer
                    key={i + ''}
                    variant={props.variant}
                    edge={props.variant === 'left' ? i === 0 : i + 1 === props.level}
                />
            )),
        [props.variant, props.level],
    );

    return <>{spaces}</>;
});

const getVariant = (groupRow: GroupedData) => {
    if ((groupRow as GroupHeader).isGroupHeader) return 'header';
    if ((groupRow as GroupFooter).isGroupFooter) return 'footer';
    return 'row';
};

export const withSpacers = (Component: ComponentType<DataTableRowProps>) => {
    const SpacedComponent = memo((props: DataTableRowProps) => {
        const { View } = useMolecules();
        const groupRow = useRecordById(props.rowId);
        const { level } = groupRow;
        const meta = useGroupMeta(props.rowId);

        const variant = getVariant(groupRow);

        const groupSpacerWrapStyles = useComponentStyles('DataGrid_SpacerRow', null, {
            variant,
        });

        const style = useComponentStyles('DataGrid_RowItem', props.rowProps?.style, {
            variant,
            states: {
                showFooter: useShowGroupFooter(meta) && variant === 'footer',
                ...useGroupRowState(meta),
            },
        });

        const rowProps = useMemo(() => ({ ...props.rowProps, style }), [style, props.rowProps]);

        return (
            <View style={groupSpacerWrapStyles}>
                <SpacerList level={level} variant="left" />
                <Component {...props} rowProps={rowProps} />
                <SpacerList level={level} variant="right" />
            </View>
        );
    });

    SpacedComponent.displayName = (Component.displayName || '') + 'WithSpacers';

    return SpacedComponent;
};
