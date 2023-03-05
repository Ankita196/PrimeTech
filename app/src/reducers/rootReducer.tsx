import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserReducer from './UserReducer';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
  // Whitelist: ['UserReducer'],
};

const appReducer = combineReducers({
  UserReducer: persistReducer(persistConfig, UserReducer),
});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
