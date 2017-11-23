import {createStore,combineReducers,applyMiddleware} from 'redux'
import promiseMiddleWare from 'redux-promise'
import * as reducer from './reducers'
const reducers = combineReducers(reducer)
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(promiseMiddleWare))
export default store