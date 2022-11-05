# SectionList

-   As a user I want to see a grouped list of items.

## Reference

https://shopify.github.io/flash-list/docs/guides/section-list/

## Personas

-   End User
-   Component consumer

### End User

-   As an end user, I want to see options rendered in different meaningful groups.
-   As an end user, I expect groups header is easily distinguishable from the options.

### Component consumer

-   As a component consumer, I expect that a SectionList implements and extends a virtualized [FlatList](./FlatList.md) to render the items.
-   As a component consumer, I expect that the SectionList normalizes the data and renders headers and items separately.
-   As a component consumer, I want to render a custom header using `renderHeader` pure function.

## Interface

```ts
    type Data = Record<string, any>;
    type SectionData = <T extends Data = {}| ItemGroup<T>>[];



    interface ItemGroup<T extends Data = {}>{
        label: string;
        children: T[]
    };


    type SectionListProps = FlatListProps &
    (
        { children?: ReactNode | ReactNode[] } |
        {
              data: SectionData[];
              renderHeader: (item: Omit<ItemGroup, "children">, index) => ReactNode;
              renderItem: <T>(item: T, index: number) => ReactNode;
        }
    );
```

```tsx
    <SectionList>
        <ListItem><Text>Shashank</Text></ListItem>
        <ListItem><Icon icon="user" /><Text>Tobias</Text></ListItem>
        <View>
            <ListItem><Text>Shashank</Text></ListItem>
            <ListItem><Icon icon="user" /><Text>Tobias</Text></ListItem>
        </View>
    </SectioList>
```

## Components Consumed

-   [Flat List](./FlatList.md)
