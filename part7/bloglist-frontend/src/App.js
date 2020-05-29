import React, { useEffect } from 'react'
import { Route, Switch, useRouteMatch} from "react-router-dom";
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import { useDispatch, useSelector } from 'react-redux'
import {initializeBlogs} from "./reducers/blogReducer"
import {initializeUsers} from "./reducers/userReducer";
import {initializeLoggedUser} from "./reducers/loginReducer";
import Menu from './components/Menu'
import User from "./components/User";
import UserList from "./components/UserList";
import BlogList from "./components/BlogList";

const App = () => {


    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)
    const loggedUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        dispatch(initializeLoggedUser())
    },[dispatch])

    const blogMatch = useRouteMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find(b => b.id === (blogMatch.params.id))
        : null

    const userMatch = useRouteMatch('/users/:id')
    const user = userMatch
        ? users.find(u => u.id === (userMatch.params.id))
        : null


    if(blogs.length===0){
        return ''
    }

    return (
        <div>
        <Menu loggedUser={loggedUser}/>

        <div className='container'>
            <br/>
            <Notification/>
            <Error/>
            <br/>
            <Switch>
                <Route path="/blogs/:id">
                    <Blog blog={blog} user={loggedUser}/>
                </Route>
                <Route path="/users/:id">
                    <User user={user}/>
                </Route>
                <Route path="/users">
                    <UserList users={users}/>
                </Route>
                <Route path="/blogs">
                    <BlogList blogs={blogs} user={loggedUser}/>
                </Route>
                <Route path="/">
                    <BlogList blogs={blogs} user={loggedUser} showBanner='true'/>
                </Route>
            </Switch>
        </div>
        </div>
        )
}

export default App