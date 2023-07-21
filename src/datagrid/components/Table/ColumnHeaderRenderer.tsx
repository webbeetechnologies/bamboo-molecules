import { memo, useMemo } from 'react';
import { RenderHeaderCellProps, useMolecules } from '@bambooapp/bamboo-molecules';
import { useFieldType } from '../../contexts';
import { StyleSheet, TextStyle } from 'react-native';
import { useField } from '../../contexts';
import { withVirtualization } from '../../hocs';

// import { ADD_FIELD_COL_ID, SELECTION_COL_ID } from './utils';
// import RowSelectionItem from './RowSelectionItem';

// const withCorrectRenderer = <T,>(Component: ComponentType<T>) => {
//     return (props: T) => {
//         switch (props.column) {
//             case SELECTION_COL_ID:
//                 return <RowSelectionItem {...props} />;
//
//             case ADD_FIELD_COL_ID:
//                 return null;
//             default:
//                 return <Component {...props} />;
//         }
//     };
// };

const ColumnHeaderRenderer = ({ column, columnIndex }: RenderHeaderCellProps) => {
    const { View, Icon, Text } = useMolecules();

    const { type, displayTitle } = useField(column);
    const { icon } = useFieldType(type);

    const { containerStyle } = useMemo(
        () => ({
            containerStyle: [
                styles.container,
                columnIndex === 0 && {
                    borderLeftWidth: 1,
                },
            ],
        }),
        [columnIndex],
    );

    return (
        <View style={containerStyle}>
            <Icon style={styles.icon} name={icon.name} type={icon.type} size={16} />
            <Text style={styles.text} numberOfLines={1}>
                {displayTitle}
            </Text>
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
});

export default memo(withVirtualization(ColumnHeaderRenderer));
