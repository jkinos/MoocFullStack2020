import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from "./reducers/nofificationReducer";
import errorReducer from "./reducers/errorReducer"
import blogReducer from "./reducers/blogReducer";
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    error: errorReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
console.log(store.getState())
export default store
