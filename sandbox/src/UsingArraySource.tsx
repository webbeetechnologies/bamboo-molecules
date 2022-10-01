import * as React from 'react';
import axios from 'axios';
import { useSortableDataSource } from './DataSource/SortableDataSource';
import { useFilterableDataSource } from './DataSource/FilterableDataSource/FilterableDataSource';
import { useArrayDataSource } from './DataSource/useArrayDataSource/useArrayDataSource';
import {ESortDirection} from "./DataSource";
import RenderRecords from "./RenderRecords";

function findAllCustomerData() {
    const records = [
        {
            "first_name": "Makenna",
            "last_name": "Bradtke",
            "id": "1"
        },
        {
            "first_name": "Berry",
            "last_name": "Jerde",
            "id": "2"
        },
        {
            "first_name": "Kiara",
            "last_name": "Heaney",
            "id": "3"
        },
        {
            "first_name": "Kylee",
            "last_name": "Turcotte",
            "id": "4"
        },
        {
            "first_name": "Shemar",
            "last_name": "Botsford",
            "id": "5"
        },
        {
            "first_name": "Houston",
            "last_name": "Cormier",
            "id": "6"
        },
        {
            "first_name": "Matilda",
            "last_name": "Thiel",
            "id": "7"
        },
        {
            "first_name": "Cristina",
            "last_name": "Larkin",
            "id": "8"
        },
        {
            "first_name": "Tina",
            "last_name": "Durgan",
            "id": "9"
        },
        {
            "first_name": "Green",
            "last_name": "Kohler",
            "id": "10"
        }
    ];
    return [
        ...records,
        ...records.map((x) => ({ ...x, last_name: x.last_name + " DEF", id: x.id + 2000})),
        ...records.map((x) => ({ ...x, id: x.id + 1000})),
        ...records.map((x) => ({ ...x, first_name: x.first_name + " ABC", id: x.id + 3000})),
    ]
}

export default function UsingArraySource({ coworkers = [] as string[] }) {
  const [workers, setWorkers] = React.useState(findAllCustomerData);

  // @ts-ignore
  const {records, applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest } = useArrayDataSource({ records: workers, sort: [] }, (...args) => {
    // @ts-ignore
    console.log(args[0].action, args);

    return args[0].records;
  });


  return (
    <RenderRecords {...{
        records, applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest
    }} />
  );
}





const Coworker = (props: any) => {
  const worker = props.worker;
  return (
    <li>
      {worker.first_name} {worker.last_name}
    </li>
  );
};
