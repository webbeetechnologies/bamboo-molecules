import React, { ComponentType } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './src/screens/Dashboard';
import { useSelector } from 'react-redux';

import ManageCategories from './src/screens/ManageCategories';

import MachineTypesMenu from './src/components/MachineType/MachineType';
import type { MachineState, MachinesType, RootState } from './src/store/types';
import Container from './src/components/Container/Container';

const Drawer = createDrawerNavigator();

import {
    useMolecules as useAtomsMolecules,
    ProvideMolecules,
    ViewProps,
    TextInputProps,
    TextProps,
} from 'bamboo-molecules';

import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from 'src/theme';

export interface InjectedComponentTypes {
    Container: ComponentType<ViewProps>;
}


export const useMolecules = () => useAtomsMolecules<InjectedComponentTypes>();

const components = { Container };
const RNRedux = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ProvideMolecules theme={theme} components={components}>
                    <App />
                </ProvideMolecules>
            </PersistGate>
        </Provider>
    );
};

const App = () => {
    const { machine_types } = useSelector((state: RootState) => state.machinesReducer);

    const { Container } = useMolecules();
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={Dashboard} />

                {machine_types.map((machine_type: MachinesType, index: number) => {
                    return (
                        <Drawer.Screen
                            key={index}
                            name={'machine-' + machine_type.id}
                            options={{
                                title: machine_type.name,
                            }}
                            children={() => (
                                <Container>
                                    <MachineTypesMenu machine_type={machine_type} />
                                </Container>
                            )}
                        />
                    );
                })}
                <Drawer.Screen name="Manage Categories" component={ManageCategories} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default RNRedux;
