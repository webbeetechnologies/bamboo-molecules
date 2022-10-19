import * as React from 'react';
import { useArrayDataSource } from './DataSource/useArrayDataSource/useArrayDataSource';
import {IDataSourceState} from "./DataSource";
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

  const state = useArrayDataSource({ records: workers, sort: [] }, (state: IDataSourceState) => {
    return state.records;
  });


  // @ts-ignore
  const {records, applySort, applyFilter, goToStart, goToEnd, goToNext, goToPrev, removeSort, ...rest } = state;


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
