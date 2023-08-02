import { memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import type { TextProps, ViewProps } from '@bambooapp/bamboo-atoms';
import { IconProps, RenderHeaderCellProps, useMolecules } from '@bambooapp/bamboo-molecules';
import { ColumnResizeHandle } from '../ColumnResizeHandle';

import { useFieldType, useField, useTableManagerStoreRef } from '../../contexts';
import { withVirtualization } from '../../hocs';
import { useContextMenu } from '../../hooks';

export type ColumnHeaderCellProps = RenderHeaderCellProps &
    ViewProps & {
        iconProps?: Partial<IconProps>;
        titleProps?: Partial<TextProps>;
        renderTitle?: (info: { title: string; type: string; id: string }) => string | ReactNode;
    };

const ColumnHeaderCell = ({
    column,
    columnIndex,
    iconProps,
    titleProps,
    children,
    renderTitle,
    ...rest
}: ColumnHeaderCellProps) => {
    const { View, Icon, Text } = useMolecules();

    const elementRef = useRef<any>(null);
    const { set: setTableManagerStore } = useTableManagerStoreRef();

    const { type, title, id } = useField(column);
    const { icon } = useFieldType(type);

    const { containerStyle, titleStyle, iconStyle } = useMemo(
        () => ({
            containerStyle: [
                styles.container,
                columnIndex === 0 && {
                    borderLeftWidth: 1,
                },
            ],
            titleStyle: [styles.text, titleProps?.style],
            iconStyle: [styles.icon, iconProps?.style],
        }),
        [columnIndex, iconProps?.style, titleProps?.style],
    );

    const handleContextMenu = useCallback(() => {
        setTableManagerStore(() => ({
            focusedCellRef: elementRef,
            focusedCell: { columnId: column, columnIndex, type: 'column' },
        }));
    }, [column, columnIndex, setTableManagerStore]);

    useContextMenu({ ref: elementRef, callback: handleContextMenu });

    return (
        <View style={containerStyle} ref={elementRef} {...rest}>
            <Icon style={iconStyle} name={icon.name} type={icon.type} size={16} {...iconProps} />
            <Text style={titleStyle} numberOfLines={1} {...titleProps}>
                {renderTitle ? renderTitle?.({ title, type, id }) : title}
            </Text>

            {children}

            <ColumnResizeHandle column={column} columnIndex={columnIndex} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        height: 32,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: 'colors.outlineVariant',
    },
    icon: {
        marginRight: 'spacings.1',
        color: 'colors.onSurfaceVariant',
    },
    text: {
        color: 'colors.onSurfaceVariant',
        fontSize: 'typescale.labelMedium.fontSize' as unknown as number,
        fontWeight: 'typescale.labelMedium.fontWeight' as unknown as TextStyle['fontWeight'],
        lineHeight: 'typescale.labelMedium.lineHeight' as unknown as number,
    },
    resizePlaceholder: {},
});

export default memo(withVirtualization(ColumnHeaderCell));
