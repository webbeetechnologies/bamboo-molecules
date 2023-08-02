// TODO: Fix Styles

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

export const DataGrid_MetaWrap = {
    flexDirection: 'row',
    borderColor: 'rgb(202, 196, 208)',
    variants: {
        // top: { paddingTop: 'spacings.3' },
        // bottom: { paddingTop: 'spacings.3' },
    },
};

export const DataGrid_Meta = {
    flex: 1,
    marginTop: 'spacings.3',
    borderColor: 'rgb(202, 196, 208)',
    borderTopWidth: 1,
};
