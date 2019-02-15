import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {
  createResponsiveStateReducer,
  createResponsiveStoreEnhancer
} from "redux-responsive";
import {exampleInitialState, productEntriesReducer} from './reducers'

import {
  apiResourceObjectsReducer, loadedBundleReducer
} from "../react-utils/redux-utils";

const scrollbarWidth = 50;

export function initializeStore(initialState=exampleInitialState) {
  const reducer = combineReducers({
    apiResourceObjects: apiResourceObjectsReducer,
    loadedBundle: loadedBundleReducer,
    productEntries: productEntriesReducer,
    browser: createResponsiveStateReducer({
      extraSmall: 575,
      small: 767,
      medium: 991,
      large: 1199,
      browse1: 350 * 2 + scrollbarWidth - 1,
      browse2: 350 * 3 + scrollbarWidth - 1,
      browse3: 350 * 4 + scrollbarWidth - 1,
      browse4: 350 * 5 + scrollbarWidth - 1,
    })
  });

  const enhancers = [
    createResponsiveStoreEnhancer({calculateInitialState: false})
  ];

  const middleware = [thunk];
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(composedEnhancers)
  )
}
