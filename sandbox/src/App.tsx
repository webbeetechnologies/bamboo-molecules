import * as React from 'react';
import UsingAsyncSource from './UsingAsyncDataSource';

export default function App({ coworkers = [] as string[] }) {
    return (
        // <UsingArraySource />
        <UsingAsyncSource />
    );
}
