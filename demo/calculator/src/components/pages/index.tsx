import { useComponents } from '@webbee/bamboo-atoms';
import React from 'react';
import { InjectedComponentTypes } from 'src/theme';

export default function index() {
    const { View, Row, RoundButton, ResultText } = useComponents<InjectedComponentTypes>();
    return (
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
    );
}
