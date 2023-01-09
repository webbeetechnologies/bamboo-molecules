// @ts-nocheck

import { Reducer } from 'react';
import { DataSourceInternalState } from './types';
import { DataSourceActions } from './createDataSource';
import FilterableDatasource, { useFilterableActionCreator } from './FilterableDatasource';
import PaginatedDataSource from './PageableDatasource';
import SortableDataSource from './SortableDatasource/sortableDataSource';
import {
    FilterableDataSourceProps,
    OnFilterAction,
    FilterableDataSourceState as FilterableDataSourceState,
    FilterableDataSourceResult,
} from './FilterableDatasource/types';

type CreatorType<PropType, StateType, DataActions, ReturnType> = (
    props: PropType,
    state: StateType,
    dispatch: (action: DataActions) => void,
    config: { hasReducer: boolean },
) => ReturnType;

type ExtractPropTypes<T extends any> = T extends (prop: infer PropType, ...arg: any) => any
    ? PropType & Record<string, any>
    : never;

type ExtractStateTypes<T extends any> = T extends (
    prop: any,
    state: infer StateType,
    ...arg: any
) => any
    ? StateType
    : never;

type ExtractActionTypes<T extends any> = T extends (
    a: any,
    b: any,
    dispatch: (actionsType: infer ActionsType) => {},
    ...arg: any
) => any
    ? ActionsType | DataSourceActions
    : never;

type ExtractReturnType<T extends any> = T extends (...arg: any) => infer R ? R : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

// Converts union to overloaded function
type UnionToOverloads<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;

type PopUnion<U> = UnionToOverloads<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// Finally me
type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];

export type DataSourceTypeFromArray<T extends {}, Arr extends any[]> = Arr[number] extends {
    actionCreator: any;
}
    ? Omit<Arr[number], 'reducer' | 'actionCreator'> & {
          reducer?: Reducer<
              ExtractStateTypes<Arr[number]['actionCreator']> & DataSourceInternalState<T>,
              ExtractActionTypes<Arr[number]['actionCreator']>
          >;
          actionCreator: CreatorType<
              ExtractPropTypes<Arr[number]['actionCreator']>,
              ExtractStateTypes<Arr[number]['actionCreator']> & DataSourceInternalState<T>,
              ExtractActionTypes<Arr[number]['actionCreator']>,
              ExtractReturnType<Arr[number]['actionCreator']>
          >;
      }
    : never;

const example = [FilterableDatasource, SortableDataSource, PaginatedDataSource];

type Test<T> = DataSourceTypeFromArray<T, typeof example>;

// TODO: Fix Maybe
let test: Test<{}>[] = [
    {
        ...FilterableDatasource,
        actionCreator: useFilterableActionCreator as CreatorType<
            FilterableDataSourceProps,
            FilterableDataSourceState<{}>,
            OnFilterAction,
            FilterableDataSourceResult
        >,
    },
];

console.log(test);

// type Complex =
//   (Omit<{
//     phase: EDataSourcePhase,
//     extractInitialState: <T extends {}>(props: FilterableDataSource<T>) => any,
//     name: string,
//     actionCreator: <T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult
//   }, "reducer" | "actionCreator">
//     & {
//     reducer?: Reducer<
//       ExtractStateTypes<<T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult> & DataSourceInternalState<T>,
//       ExtractActionTypes<<T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult>
//     >,
//     actionCreator: CreatorType<
//       ExtractPropTypes<<T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult>,
//       ExtractStateTypes<<T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult> & DataSourceInternalState<T>,
//       ExtractActionTypes<<T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult>,
//       ExtractReturnType<<T extends {}>(props: FilterableDataSourceProps, dataSource: FilterableDataSource<T>, dispatch: (action: OnFilterAction) => void, config: {hasReducer: boolean}) => FilterableDataSourceResult>
//     >
//   }) | (Omit<{extractInitialState: (props: any) => any, name: string, actionCreator: <T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: boolean}}, "reducer" | "actionCreator"> & {reducer?: Reducer<ExtractStateTypes<<T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: ...}> & DataSourceInternalState<T>, ExtractActionTypes<<T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: boolean}>>, actionCreator: CreatorType<ExtractPropTypes<<T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: boolean}>, ExtractStateTypes<<T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: ...}> & DataSourceInternalState<T>, ExtractActionTypes<<T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: boolean}>, ExtractReturnType<<T extends {}>(props: SortableDataSourceProps, dataSource: SortableDataSource<T>, dispatch: (action: OnSortAction) => void, config: {hasReducer: boolean}) => {isSortable: boolean}>>}) | (Omit<{extractInitialState: <T extends {}>(props: PaginationDataSource<T>) => any, name: string, actionCreator: <T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: boolean}}, "reducer" | "actionCreator"> & {reducer?: Reducer<ExtractStateTypes<<T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: ...}> & DataSourceInternalState<T>, ExtractActionTypes<<T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: boolean}>>, actionCreator: CreatorType<ExtractPropTypes<<T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: boolean}>, ExtractStateTypes<<T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: ...}> & DataSourceInternalState<T>, ExtractActionTypes<<T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: boolean}>, ExtractReturnType<<T extends {}>(props: PageableDataSourceProps, dataSource: PaginationDataSource<T>, dispatch: (action: OnPaginateAction) => void, config: {hasReducer: boolean}) => {isPaginated: boolean}>>})
