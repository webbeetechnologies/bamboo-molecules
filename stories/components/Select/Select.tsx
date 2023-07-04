import { useMolecules, SelectProps } from '../../../src';
import { useState } from 'react';

export type Props = SelectProps & {};

export const Example = (props: Props) => {
    const { Select } = useMolecules();
    const [query, setQuery] = useState('');

    return <Select {...props} query={query} onQueryChange={setQuery} />;
};
