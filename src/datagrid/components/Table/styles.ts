export const DataGrid_SpacerRow = {
    flexDirection: 'row' as const,
    borderColor: 'colors.onSurfaceVariant',
};

export const DataGrid_Spacer = {
    width: 'spacings.3',
    borderColor: 'colors.onSurfaceVariant',
    variants: {
        left: {
            borderLeftWidth: 1,
        },
        right: {
            borderLeftWidth: 1,
        },
    },
};

export const DataGrid_RowItem = {
    flex: 1,
    borderColor: 'colors.onSurfaceVariant',
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
};

export const DataGrid_GroupHeaderItem = {
    ...DataGrid_RowItem,
    marginTop: 'spacings.3',
    borderRightWidth: 1,
    borderLeftWidth: 1,

    states: {
        isFirst: {
            marginTop: 0,
        },
    },
};

export const DataGrid_GroupFooterItem = {
    ...DataGrid_GroupHeaderItem,
    marginTop: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    height: 'spacings.3',

    states: {
        showFooter: {
            borderTopWidth: 1,
            height: undefined,
        },
    },
};
