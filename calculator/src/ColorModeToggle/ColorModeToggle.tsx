import React from 'react';
import { useColorMode } from '@webbee/bamboo-atoms';
import { useMolecules } from '../../App';

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { IconButton } = useMolecules();
    
    const IconName = React.useMemo(
        () => (colorMode === 'light' ? 'white-balance-sunny' : 'weather-night'),
        [colorMode],
    );

    return (
        <IconButton size="lg" type="material-community" name={IconName} onPress={toggleColorMode} />
    );
};

export default ColorModeToggle;
