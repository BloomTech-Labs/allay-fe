// configure redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// uncomment logger to show redux devtools
//import logger from 'redux-logger';
// import mainReducer from './state/reducers';
import { rootReducer } from './state/reducers/index';

// redux dev tools and store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(
			thunk
			//, logger
		)
	)
);

export default store;
