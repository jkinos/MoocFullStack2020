import React from "react";
import {createBlog} from "../reducers/blogReducer";
import {setNotification} from "../reducers/nofificationReducer";
import {setError} from "../reducers/errorReducer";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {updateUserBlogs} from "../reducers/userReducer";
import blogService from '../services/blogs'

const BlogList = ({blogs,user}) => {
    const blogFormRef = React.createRef()
    const dispatch = useDispatch()

    const addBlog =  async (newObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const updatedBlog= await blogService.create(newObject)
            await dispatch(createBlog(updatedBlog))
            await dispatch(updateUserBlogs(user, updatedBlog))
            await dispatch(setNotification(`a new blog ${newObject.title} by ${newObject.author} succesfully added`,5))
        } catch (exception) {
            dispatch(setError(exception.message,5))
        }
    }

    const blogForm = () =>
        <Togglable buttonLabel='add new blog' ref={ blogFormRef }>
            <BlogForm
                addBlog={ addBlog }
                user={ user }
            />
        </Togglable>

    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        listStyle: 'none'
    }
    return (
        <div>
    <h2>create new</h2>
    { blogForm() }
    <br/>
    { blogs.map(blog =>
        <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
    )}
        </div>
    )
}
export default BlogList