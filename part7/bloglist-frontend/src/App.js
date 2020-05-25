import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './App.css'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import {like, remove} from './reducers/blogReducer'
import {setNotification} from "./reducers/nofificationReducer"
import {setError} from "./reducers/errorReducer"
import {createBlog, initializeBlogs} from "./reducers/blogReducer"
import {loggedUser} from "./reducers/loginReducer";
import {login} from "./reducers/loginReducer";
import {logout} from "./reducers/loginReducer";

const App = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const blogFormRef = React.createRef()
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    },[dispatch])

    useEffect(() => {
        dispatch(loggedUser())
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(login(username,password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setError('wrong password or username',5))        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
        setUsername('')
        setPassword('')
    }

    const addBlog =  async (newObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            await dispatch(createBlog(newObject))
            dispatch(setNotification(`a new blog ${newObject.title} by ${newObject.author} succesfully added`,5))
        } catch (exception) {
            dispatch(setError(exception.message,5))
        }
    }
    const likeBlog = (blogObject) => {
        try {
            dispatch(like(blogObject))
        }catch (e) { console.log(e.message)
        }
    }
    const removeBlog = (id) => {
            try {
                dispatch(remove(id))
            } catch (e) {
                console.log(e.message)
            }
    }
    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={ username }
                    password={ password }
                    handleUsernameChange={ ({ target }) => setUsername(target.value) }
                    handlePasswordChange={ ({ target }) => setPassword(target.value) }
                    handleLogin={ handleLogin }
                />
            </Togglable>
        )
    }

    const blogForm = () =>
        <Togglable buttonLabel='add new blog' ref={ blogFormRef }>
            <BlogForm
                addBlog={ addBlog }
                user={ user }
            />
        </Togglable>
    if (user===null) {
        return (
            <div>
                <Notification/>
                <Error/>
                <h2>Log in to application</h2>
                { loginForm() }
            </div>
        )
    }

    return (
        <div>
            <h1>blogs</h1>
            <Notification/>
            <Error/>
            <div>{ user.username } logged in <button onClick={ handleLogout }>logout</button></div>
            <h2>create new</h2>
            { blogForm() }
            <br/>
            { blogs.map(blog =>
                    <Blog key={ blog.id }
                          blog={ blog }
                          user={ user }
                          blogs={ blogs }
                          like={ likeBlog }
                          remove={ removeBlog }
                    />
                          ) }
        </div>
    )
}

export default App