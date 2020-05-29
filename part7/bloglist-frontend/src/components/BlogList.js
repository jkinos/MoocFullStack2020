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
import { Table, Jumbotron } from 'react-bootstrap'

const BlogList = ({blogs,user,showBanner}) => {
    const blogFormRef = React.createRef()
    const dispatch = useDispatch()

    const addBlog = async (newObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const updatedBlog = await blogService.create(newObject)
            await dispatch(createBlog(updatedBlog))
            await dispatch(updateUserBlogs(user, updatedBlog))
            await dispatch(setNotification(`a new blog ${newObject.title} by ${newObject.author} succesfully added`, 5))
        } catch (exception) {
            dispatch(setError(exception.message, 5))
        }
    }

    const blogForm = () =>
    <Togglable variant='dark' buttonLabel='add new blog' ref={blogFormRef}>
        <BlogForm
            addBlog={addBlog}
            user={user}
        />
    </Togglable>

    const banner = () => {
        console.log('showBanner', showBanner)
        if(!showBanner) {
            return ''
        }
        return(
        <Jumbotron id='banner' style={{backgroundColor: '#f8f9fa',borderColor:'black}'}}>
            <h1>Hello, Blog Lover!</h1>
            <p>
                <i>
                    This is the most awesome blog app in the whole god damn world wide web, an application desinged for you to keep track of your favorite blogs!</i>
            </p>
            <p>
                <i>Add them, like them, comment them...remove them.</i>
            </p>
            <p>
                <i>That's pretty much all you can do. Pretty Awesome!</i>
            </p>
        </Jumbotron>)

    }

    return (
        <div>
            {banner()}
            <h1>Blogs</h1>
            <br/>
    { blogForm() }
    <br/>
            <Table striped>
                <thead>
                <tr>
                    <th>Blog</th>
                    <th>Author</th>
                </tr>
                </thead>
                <tbody>
                { blogs.map(blog =>
        <tr key={blog.id} >
            <td>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>{blog.author}</td>
        </tr>
    )}
                </tbody>
            </Table>
        </div>
    )
}
export default BlogList