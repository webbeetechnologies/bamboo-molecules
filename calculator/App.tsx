// import Cases from './Cases';

// export default () => <Cases />;

import React from 'react';
import Calculator from './src/Calculator/Calculator';
import { ProvideMolecules } from '../src/core';

const App = () => {
    return (
        <ProvideMolecules>
            <Calculator style={{
                maxWidth:300
            }} />
        </ProvideMolecules>
    );
};

export default App;
