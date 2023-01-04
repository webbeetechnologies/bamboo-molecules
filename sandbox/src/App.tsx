import * as React from 'react';
import UsingAsyncSource from './UsingAsyncDataSource';
import UsingArraySource from './UsingArrayDataSource';

export default function App({ coworkers = [] as string[] }) {
    return (
        <>
            <UsingArraySource />
            <UsingAsyncSource />
        </>
    );
}
