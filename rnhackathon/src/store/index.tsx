import {createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import machinesReducer from './reducers/machinesReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  machinesReducer: persistReducer(persistConfig, machinesReducer),
});
export const store = createStore(rootReducer);

export const persistor = persistStore(store);

