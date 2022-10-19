import * as React from 'react';
import axios from 'axios';
import { useAsyncDataSource } from './DataSource/useAsyncDataSource/useAsyncDataSource';
import RenderRecords from "./RenderRecords";
import {TCustomerData} from "./types";

function findAllCustomerData(): Promise<TCustomerData> {
  const baseURL = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com';
  return new Promise(function (resolve, reject) {
    axios
      .post('customers', {}, { baseURL: baseURL })
      .then(function (result: any) {
        var dataPromises = result.data.customerIds./*splice(0, Math.floor(Math.random() * 10)).*/map(function (customerId: any) {
          return axios.get('customers/' + customerId, { baseURL: baseURL });
        });

        Promise.all(dataPromises)
          .then(function (res) {
            resolve(
              res.map(function (result) {
                return result.data;
              })
            );
          })
          .catch(function (err) {
            reject(err);
          });
      })
      .catch(function (err: any) {
        console.log('fails', err.toString());
        reject(err);
      });
  });
}

export default function UsingAsyncSource({ coworkers = [] as string[] }) {
  // @ts-ignore
  const {isLoading,  ...rest } = useAsyncDataSource({
      records: [], 
      sort: [], 
      pagination: {page: 1, pageSize: 3},
    },
    async ({ records, action, ...args }) => {
      // @ts-ignore
      return (await findAllCustomerData()) as any[];
    });

  return (
    <RenderRecords {...{
        ...rest
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
