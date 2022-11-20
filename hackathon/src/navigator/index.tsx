import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { DashboardScreen, ManageMachineTypesScreen } from '../screens';
import { CustomDrawer } from '../components';
import { ROUTE_KEYS } from './utils';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const defaultScreenOptions = { headerShown: false };

export default function Navigator() {
    return (
        <Drawer.Navigator
            initialRouteName={ROUTE_KEYS.DASHBOARD}
            drawerContent={CustomDrawer}
            screenOptions={defaultScreenOptions}>
            <Stack.Screen name={ROUTE_KEYS.DASHBOARD} component={DashboardScreen} />
            <Stack.Screen
                name={ROUTE_KEYS.MANAGE_MACHINE_TYPES}
                component={ManageMachineTypesScreen}
            />
        </Drawer.Navigator>
    );
}
