import { ColumnSort, ESortableActions, ESortDirection, SortableReducer } from './types';

export const sortableDataSourceReducer: SortableReducer = (dataSource, args) => {
    let { order } = dataSource.sort;
    const { isNestedSort } = dataSource.sort;

    switch (args.type) {
        case ESortableActions.ApplySort:
            const sortItem = {
                column: args.payload.column,
                direction: args.payload.direction ?? ESortDirection.Asc,
            };
            order = !isNestedSort ? [sortItem] : [...order, sortItem];
            break;
        case ESortableActions.RemoveSort:
            order = order.filter(({ column }) => column !== args.payload.column);
            break;
        case ESortableActions.ReorderSort:
            if (args.payload.prevIndex > order.length - 1)
                throw new Error(`Item doesn't exist at position ${args.payload.prevIndex}`);
            order = [...order];
            const oldItem = order.at(args.payload.prevIndex) as ColumnSort;
            order.splice(args.payload.prevIndex, 1);
            order.splice(args.payload.newIndex, 0, oldItem);
            break;
        case ESortableActions.UpdateSort:
            const {
                index,
                column = order[index].column,
                direction = order[index].direction,
            } = args.payload;
            if (index > order.length - 1)
                throw new Error(`Sort doesn't exist at position ${index}`);

            order = [...order];
            order[index] = {
                ...order[index],
                column,
                direction,
            };
            break;
        default:
            return dataSource;
    }

    dataSource = {
        ...dataSource,
        sort: {
            order,
            isNestedSort,
        },
    };

    return dataSource;
};
