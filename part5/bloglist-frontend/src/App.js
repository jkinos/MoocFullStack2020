import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm"
import './App.css'
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage,setErrorMessage] = useState(null)
    const blogFormRef = React.createRef()

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

    const handleLogin = async (credentials) => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong password or username')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
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
            setSuccessMessage(`a new blog ${blog.title} by ${blog.author} succesfully added`)
            setTimeout(() => {
                setSuccessMessage(null)
            },5000)
        } catch (exception) {
            setErrorMessage(exception.message)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({target})=> setUsername(target.value)}
                    handlePasswordChange={({target})=> setPassword(target.value)}
                    handleLogin={handleLogin}
                />
            </Togglable>
        )
    }

    const blogForm = () =>
        <Togglable buttonLabel='add new blog' ref={blogFormRef}>
        <BlogForm
            addBlog={addBlog}
            user={user}
        />
        </Togglable>

    if (user===null) {
    return (
        <div>
        <Notification message={errorMessage} className='error' />
        <Notification message={successMessage} className='success' />
        <h2>Log in to application</h2>
            {loginForm()}
        </div>
    )
}
  return (
    <div>
        <h1>blogs</h1>
        <Notification message={errorMessage} className='error' />
        <Notification message={successMessage} className='success' />
        <div>{user.username} logged in <button onClick={handleLogout}>logout</button></div>
        <h2>create new</h2>
        {blogForm()}
    <br/>
        {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} />
            )}
    </div>
  )
}

export default App