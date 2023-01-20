# DataSource

The project aims to create an abstraction for the basic actions performed on data.
- Pagination
- Sort
- Filter
- Order
- Fetch

## Exports
- createDataSource
- SortableDataSource
  - SortableDataSourceMiddleware
  - SortableDataSourceProvider
  - useSortableDataSource
  - useSortableDispatch
- PaginatedDataSource
    - PaginatedDataSourceMiddleware
    - PaginatedDataSourceProvider
    - usePaginatedDataSource
    - usePaginatedDispatch
- LoadableDataSource
    - LoadableDataSourceMiddleware
    - LoadableDataSourceProvider
    - useLoadableDataSource
    - useLoadableDispatch
- FilterableDataSource
    - FilterableDataSourceMiddleware
    - FilterableDataSourceProvider
    - useFilterableDataSource
    - useFilterableDispatch
- ArrayDataSource
    - ArrayDataSourceProvider
    - useArrayDataSource
    - useArrayDispatch
- AsyncDataSource
    - AsyncDataSourceProvider
    - useAsyncDataSource
    - useAsyncDispatch

## Architecture
A `createDataSource` composer function takes an array of middleware objects that define a datasource.
The output of createDataSource is a ContextProvider component, and two hooks to get context and dispatch actions.



### Usage

```ts
import { createDataSource, EDataSourcePhase } from "./createDataSource";


/**
 * Example middle
 */
const FooMiddleware = {

  /**
   *
   * Name for the middleware
   * Used only for logging
   *
   */
  name: "foo-middleware",


  /**
   *
   * Defines how data is processed.
   * BEFORE_DATA: Data is not yet available; requires a recordsPresenter
   * ON_DATA: Data is available for the middleware to work with.
   *
   */
  phase: EDataSourcePhase.ON_DATA,

  /**
   *
   * gets the current state of the application
   * returns the modified state.
   *
   */
  reducer(state, action) {
    return state;
  },

  /**
   *
   * returns additional state/ properties for the datasource
   *
   */
  actionCreator: (props, state, dispatch, config) => ({
    makeFoo() {},
    makeBar() {},
    isFooAndBar: state.isFooBar && state.isFoo,
  }),

  /**
   *
   * presents new records once an action has been performed
   *
   */
  presenter(state) {
    return state.records
  },

  /**
   *
   * extracts the state for middleware
   *
   */
  extractInitialState(props) {
    return {
      isFooBar: props.isFooBar ?? false,
    }
  },

  initialState: {
    isFoo: true
  }
}


const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource("my-first-data-source", [FooMiddleware]);
```



#### DataSourceProvider
Wrap your component with the DataSource Provider.
```tsx
const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource("my-first-data-source", [FooMiddleware]);

const ListPresentation = () => {
  const datasource = useDataSourceHook();
  return <>{datasource.records.map(({ name, id }) => <ListItem id={id} name={name} />)}</>
}

const List = () => {
  
  <DataSourceProvider records={[]}>
    <ListPresentation />
  </DataSourceProvider>
}
```