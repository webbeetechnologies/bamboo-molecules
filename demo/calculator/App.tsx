import React from 'react';
import { calculatorWrapper, InjectedComponentTypes } from './src/theme';
import { useMolecules } from '../../src/hooks';
import Pages from './src/components/pages';

const App = () => {
    const { Container, CalcWrapper, CustomTitle } = useMolecules<InjectedComponentTypes>();
    return (
        <Container>
            <CustomTitle />
            <CalcWrapper>
                <Pages />
            </CalcWrapper>
        </Container>
    );
};

export default calculatorWrapper(App);
