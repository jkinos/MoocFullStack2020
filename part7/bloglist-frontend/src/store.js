import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from "./reducers/nofificationReducer";
import errorReducer from "./reducers/errorReducer"
import blogReducer from "./reducers/blogReducer";
import loginReducer from './reducers/loginReducer'
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    blogs: blogReducer,
    users: userReducer,
    user: loginReducer,
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
