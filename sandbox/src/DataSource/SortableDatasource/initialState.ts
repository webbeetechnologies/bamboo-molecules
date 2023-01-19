import omitBy from 'lodash/omitBy';

export const extractInitialState = (props: any) =>
    omitBy(
        {
            isSortable: props.isSortable ?? false,
            sort: Object.assign({ order: [], isNestedSort: false }, props.sort) ?? null,
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
