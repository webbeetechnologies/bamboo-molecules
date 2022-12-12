import React, { useEffect, useState } from 'react';
import { ProvideMolecules, useMolecules } from 'bamboo-molecules';

const App = () => {
    return (
        <ProvideMolecules>
            <CheckComponent />
        </ProvideMolecules>
    );
};

export default App;

const CheckComponent = () => {
    const { ProgressBar, View, ProgressCircle } = useMolecules();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setProgress(Math.random() * 100);
        }, 1000);
    }, []);

    return (
        <View style={{ width: 500 }}>
            <ProgressBar progress={progress}   />
            <ProgressBar progress={progress} indeterminate />
            <ProgressCircle progress={progress} style={{ width: 100 }} showText />
            <ProgressCircle progress={progress} style={{ width: 100 }} indeterminate />
        </View>
    );
};
