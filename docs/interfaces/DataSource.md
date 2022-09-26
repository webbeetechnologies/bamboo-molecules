# Data source

## Examples

## User stories
- As a developer I want to provide data to a component
- As a component developer I want a standardized way on how to get data 
- As a component developer I want to implement infinite scrolling so I need pagination support on my data
- As a component developer I want to offer my component users a way to filter down data so the data source needs to support filtering
- As a component developer I want to offer my component users the possibility to sort the data so I need the data source to support sorting
- As a developer I might not always be able to provide sorting, filter and pagination support

```typescript
interface PaginationProps {
    page: number
    perPage: number
}

interface FilterProps {
    filters: Record<string, any>
}

interface SortProps {
    sort: Record<string, { direction: "asc" | "desc", order: number }>
}

interface DataSourceResultProps {
    
}

interface PaginationInfo {
    count: number
}

interface LoadingState {
    started_at: Date
    finished_at: Date,
    errorored_at: Date
}


interface DataSource {
    results: any[];
    pagination: PaginationInfo & PaginationProps;
    loading: LoadingState;
    
    loadResults(props: DataSourceResultProps);
}

class MySuperDataSource implements DataSource {
    
}
```
