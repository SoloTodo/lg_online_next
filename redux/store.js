import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {exampleInitialState, productEntriesReducer} from './reducers'

import {
  apiResourceObjectsReducer, loadedBundleReducer
} from "../react-utils/redux-utils";


export function initializeStore(initialState=exampleInitialState) {
  const reducer = combineReducers({
    apiResourceObjects: apiResourceObjectsReducer,
    loadedBundle: loadedBundleReducer,
    productEntries: productEntriesReducer,
  });

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}
