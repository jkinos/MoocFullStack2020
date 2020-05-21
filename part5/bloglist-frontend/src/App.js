import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './App.css'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import {setNotification} from "./reducers/nofificationReducer"
import {setError} from "./reducers/errorReducer";

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const blogFormRef = React.createRef()
    const dispatch = useDispatch()

    useEffect(() => {
        const getBlogs = async () => {
            const blogs = await blogService.getAll()
            const blogsOrderedByLikes = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogsOrderedByLikes)
        }
        getBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password } )
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setError('wrong password or username',5))        }
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        setUser(null)
        setUsername('')
        setPassword('')
    }

    const addBlog = async (newObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create(newObject)
            setBlogs(blogs.concat(blog))
            dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} succesfully added`,5))
        } catch (exception) {
            dispatch(setError(exception.message,5))
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

    const likeBlog = async (id,blogObject,setLikes) => {
        try {
            const response = await blogService.update(id,blogObject)
            setLikes(response.likes)
        }catch (e) { console.log(e.message)
        }
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
                          setBlogs={ setBlogs }
                          like={ likeBlog }
                    />
                          ) }
        </div>
    )
}

export default App