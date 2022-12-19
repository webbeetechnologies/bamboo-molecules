import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAsyncDataSource } from './DataSource/useAsyncDataSource/useAsyncDataSource';
import RenderRecords from './components/RenderRecords';
import { Records } from './DataSource';
import { RecordType } from './types';

function findAllCustomerData() {
    const baseURL = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com';
    return new Promise(function (resolve, reject) {
        axios
            .post('customers', {}, { baseURL: baseURL })
            .then(function (result: AxiosResponse<{ customerIds: number[] }>) {
                var dataPromises =
                    result.data.customerIds./*splice(0, Math.floor(Math.random() * 10)).*/ map(
                        function (customerId: number) {
                            return axios.get('customers/' + customerId, {
                                baseURL: baseURL,
                            }) as Promise<AxiosResponse<RecordType>>;
                        },
                    );

                Promise.all(dataPromises)
                    .then(function (res) {
                        resolve(
                            res.map(function (result) {
                                return result.data;
                            }),
                        );
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            })
            .catch(function (err: Error) {
                console.log('fails', err.toString());
                reject(err);
            });
    }) as Promise<Records<RecordType>>;
}

export default function UsingAsyncSource({}) {
    const dataSource = useAsyncDataSource(
        {
            records: [] as RecordType[],
            sort: [],
            pagination: { page: 1, pageSize: 3 },
        },
        async ({ records, action, ...args }) => {
            return await findAllCustomerData();
        },
    );

    return (
        <RenderRecords
            {...{
                ...dataSource,
            }}
        />
    );
}
