import { ESortDirection, SortableDataSourceResult, useDataSource } from '../DataSource';
import { RenderJSON } from './RenderJSONDemo';
import { useCallback, useMemo } from 'react';
import keyBy from 'lodash/keyby';

const getSortableProps = <T,>(props: SortableDataSourceResult<T>) => {
    if (!props.isSortable) {
        return { isSortable: props.isSortable };
    }

    const { isSortable, sort, applySort, removeSort, reorderSort, updateSort } = props;
    return { isSortable, sort, applySort, removeSort, reorderSort, updateSort };
};

export const ApplySort = () => {
    const sortableProps = getSortableProps(useDataSource());

    const order = sortableProps.sort?.order;
    const sortOrderHash = useMemo(() => keyBy(order, 'column'), [order]);

    const handleApplySort = useCallback(
        (column: string, direction?: ESortDirection) => {
            sortableProps.applySort?.({ column, direction });
        },
        [sortableProps.applySort],
    );

    const handleMoveSort = useCallback(
        (newIndex: string, i: number) => {
            sortableProps.reorderSort?.({
                newIndex: newIndex === '' ? i : +newIndex,
                prevIndex: i,
            });
        },
        [sortableProps.reorderSort],
    );

    const handleRemoveSort = useCallback(
        (column: string) => {
            sortableProps.removeSort?.({ column });
        },
        [sortableProps.removeSort],
    );

    const handleUpdateSortDirection = useCallback(
        (index: number, direction: ESortDirection) => {
            sortableProps.updateSort?.({ direction, index });
        },
        [sortableProps.updateSort],
    );

    if (!sortableProps.isSortable) {
        return null;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div>
                <h1>Sorting</h1>
                <table width="300" style={{ marginBlockEnd: 15 }}>
                    {sortableProps.sort?.order.length > 0 && (
                        <thead style={{ textAlign: 'left' }}>
                            <tr>
                                <th>Column</th>
                                <th>Order</th>
                                {sortableProps.sort?.isNestedSort && <th>Order</th>}
                                <th>Order</th>
                            </tr>
                        </thead>
                    )}
                    {sortableProps.sort?.order.map(({ column, ...rest }, i) => {
                        return (
                            <tbody key={column}>
                                <tr>
                                    <td>{column}</td>
                                    <td>
                                        <select
                                            key={column + 'sort'}
                                            value={rest.direction + ''}
                                            onChange={e => {
                                                handleUpdateSortDirection(
                                                    i,
                                                    +e.target.value as unknown as ESortDirection,
                                                );
                                            }}>
                                            <option value={ESortDirection.Asc}>asc</option>
                                            <option value={ESortDirection.Desc}>desc</option>
                                        </select>
                                    </td>
                                    {sortableProps.sort?.isNestedSort && (
                                        <td>
                                            <input
                                                value={i}
                                                type="number"
                                                onChange={e => handleMoveSort(e.target.value, i)}
                                            />
                                        </td>
                                    )}
                                    <td>
                                        <button onClick={() => handleRemoveSort(column)}>X</button>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>

                <select onChange={e => handleApplySort(e.target.value)} value={''}>
                    <option>Select a column to Filter on</option>
                    {['id', 'first_name', 'last_name'].map(val =>
                        sortOrderHash?.[val] ? null : (
                            <option key={val} value={val}>
                                {val}
                            </option>
                        ),
                    )}
                </select>
                <RenderJSON json={sortableProps.sort} />
            </div>
        </div>
    );
};
