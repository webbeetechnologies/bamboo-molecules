export const DataGrid_SpacerRow = {
    flexDirection: 'row' as const,
    borderColor: 'colors.outlineVariant',
};

export const DataGrid_Spacer = {
    borderColor: 'colors.outlineVariant',
    variants: {
        left: {
            borderLeftWidth: 1,
        },
        right: {
            borderRightWidth: 1,
        },
    },
};

const DataGrid_RowBase = {
    flex: 1,
    borderColor: 'colors.outlineVariant',
};

export const DataGrid_RowItem = {
    ...DataGrid_RowBase,
};

export const DataGrid_GroupHeaderItem = {
    ...DataGrid_RowBase,
    marginTop: 'spacings.3',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,

    states: {
        isFirstGroup: {},
        isFirst: {
            marginTop: 0,
        },
        isDataRowHeader: {
            borderBottomWidth: 1,
        },
        isDataRowHeaderFirst: {
            borderBottomWidth: 1,
            marginTop: 0,
        },
    },
};

export const DataGrid_GroupFooterItem = {
    ...DataGrid_GroupHeaderItem,
    marginTop: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
};

export const DataGrid_EmptyFooterRow = {
    ...DataGrid_RowBase,
};
