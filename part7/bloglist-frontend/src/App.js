import React, { useState, useEffect } from 'react'
import { Route, Switch, useRouteMatch} from "react-router-dom";
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import { useDispatch, useSelector } from 'react-redux'
import {initializeBlogs} from "./reducers/blogReducer"
import {initializeUsers} from "./reducers/userReducer";
import {initializeLoggedUser, logout} from "./reducers/loginReducer";
import Menu from './components/Menu'
import Login from "./components/Login";
import User from "./components/User";
import UserList from "./components/UserList";
import BlogList from "./components/BlogList";

const App = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const blogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.users)
    const loggedUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        dispatch(initializeLoggedUser())
    },[dispatch])


    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
        setUsername('')
        setPassword('')
    }


    const blogMatch = useRouteMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find(b => b.id === (blogMatch.params.id))
        : null

    const userMatch = useRouteMatch('/users/:id')
    const user = userMatch
        ? users.find(u => u.id === (userMatch.params.id))
        : null

    if (loggedUser===null) {
        return (
            <Login
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}/>
        )
    }

    if(blogs.length===0){
        return ''
    }

    return (
        <div>
            <Menu loggedUser={loggedUser} handleLogout={handleLogout}/>
            <h1>blog app</h1>
            <Notification/>
            <Error/>
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
                <Route path="/">
                    <BlogList blogs={blogs} user={loggedUser}/>
                </Route>
            </Switch>
        </div>
        )
}

export default App