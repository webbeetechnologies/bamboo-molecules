import { useComponentStyles } from '@webbee/bamboo-atoms';
import React, { useMemo } from 'react';
import { useMolecules } from '../../../App';

export type Props = {
    sizes?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'md' | 'rg' | 'sm';
    children: React.ReactNode;
};

const SuperText = (props: Props) => {
    const { sizes = 'rg', ...rest } = props;

    const TextStyle = useComponentStyles('Text');

    
    const textStyle = useMemo(
        () => ({
            ...TextStyle[sizes].typeScale,
            ...TextStyle[sizes],
        }),
        [],
    );

   
    const { Text } = useMolecules();
    return <Text style={textStyle}>{rest.children}</Text>;
};

export default SuperText;
