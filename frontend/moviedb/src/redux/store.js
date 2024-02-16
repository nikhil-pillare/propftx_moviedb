import {thunk} from 'redux-thunk'
import { reducer as authReducer } from './auth/reducer'
import movieReducer from './movies/reducer'
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
const rootReducer = combineReducers({auth:authReducer, moviedb: movieReducer})
export const store= legacy_createStore(rootReducer, applyMiddleware(thunk))



