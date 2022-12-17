import omitBy from 'lodash.omitby';

export const extractInitialState = (props: any) =>
    omitBy(
        {
            isSortable: props.isSortable ?? false,
            sort: props.sort ?? null,
        },
        value => value === null,
    );

export const initialState = {
    isSortable: true,
    sort: {
        isNestedSort: false,
        order: [],
    },
};
