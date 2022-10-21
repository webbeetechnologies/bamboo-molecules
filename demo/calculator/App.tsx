import React from 'react';
import { calculatorWrapper, InjectedComponentTypes } from './src/theme';
import { useMolecules } from '../../src/hooks';

const App = () => {
    const { View, Row, RoundButton, Container, CalcWrapper, ResultText, CustomTitle } =
        useMolecules<InjectedComponentTypes>();
    return (
        <Container>
            <CustomTitle />
            <CalcWrapper>
                <View>
                    <ResultText />
                    <Row>
                        <RoundButton variant="text" children="C" />
                        <RoundButton variant="text" children="+/-" />
                        <RoundButton variant="text" children="%" />
                        <RoundButton variant="outlined" children="/" />
                    </Row>

                    {/* Number */}
                    <Row>
                        <RoundButton children="7" />
                        <RoundButton children="8" />
                        <RoundButton children="9" />
                        <RoundButton variant="outlined" children="X" />
                    </Row>

                    <Row>
                        <RoundButton children="4" />
                        <RoundButton children="5" />
                        <RoundButton children="6" />
                        <RoundButton variant="outlined" children="-" />
                    </Row>

                    <Row>
                        <RoundButton children="1" />
                        <RoundButton children="2" />
                        <RoundButton children="3" />
                        <RoundButton variant="outlined" children="+" />
                    </Row>

                    <Row>
                        <RoundButton children="0" />
                        <RoundButton children="00" />
                        <RoundButton children="." />
                        <RoundButton variant="contained" children="=" />
                    </Row>
                </View>
            </CalcWrapper>
        </Container>
    );
};

export default calculatorWrapper(App);
