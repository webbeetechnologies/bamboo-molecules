export const DataGrid_SpacerRow = {
    flexDirection: 'row' as const,
    borderColor: 'rgb(202, 196, 208)',
};

export const DataGrid_Spacer = {
    width: 'spacings.3',
    borderColor: 'rgb(202, 196, 208)',
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
    borderColor: 'rgb(202, 196, 208)',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    variants: {
        row: {
            borderLeftWidth: 0,
            borderRightWidth: 0,
        },
        header: {
            marginTop: 'spacings.3',

            states: {
                isFirst: {
                    marginTop: 0,
                },
            },
        },
        footer: {
            borderBottomWidth: 1,
            borderTopWidth: 0,
            height: 'spacings.3',
            states: {
                showFooter: {
                    borderTopWidth: 1,
                    height: undefined,
                },
            },
        },
    },
};
