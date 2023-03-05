import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './reducers/rootReducer';

/*
 *Export default function configureStore() {
 *  return createStore(rootReducer, applyMiddleware(thunk));
 *}
 */

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const PersistStore = persistStore(store);
