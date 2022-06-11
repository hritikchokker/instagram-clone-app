import { configureStore, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';

const middleware = [thunk];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// import { configureStore, applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './index';

// export default function configureStore(state) {
//   const middleware = [thunk];

//   const middlewareEnhancer = applyMiddleware(...middleware);
//   const storeEnhancers = [middlewareEnhancer];
//   const composedEnhancer = composeWithDevTools(...storeEnhancers);

//   const store = createStore(rootReducer, state, composedEnhancer);
//   return store;
// }
