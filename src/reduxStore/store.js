import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import  generalReducer  from './reducers/generalReducer'

const reducer = combineReducers({
     general: generalReducer,
})
const initialState = {}
const middleware = [thunk]

const store = createStore(
     reducer, 
     initialState, 
     composeWithDevTools(applyMiddleware(...middleware))
)

export default store