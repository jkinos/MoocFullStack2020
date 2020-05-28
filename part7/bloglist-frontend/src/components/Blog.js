import React, { useState } from 'react'
import {like, remove,commentBlog} from "../reducers/blogReducer";
import {useDispatch} from "react-redux";
import {
    useHistory
} from 'react-router-dom'


const Blog = ({ user, blog }) => {
    const showForOwnerOnly = {display: user.id === (blog.user.id || blog.user) ? '' : 'none', backgroundColor: 'blue'}
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const likeBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id || blog.user,
            id: blog.id
        }
        try {
            await dispatch(like(blogObject))
        }catch (e) { console.log(e.message)
        }
    }


    const removeBlog = async (event) => {
        event.preventDefault()
        const message = `Remove blog ${blog.title} by ${blog.author}`
        if (window.confirm(message)) {
            try {
                dispatch(remove(blog.id))
                history.push('/')
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    const addComment = async (event) => {
        event.preventDefault()
        console.log('comment', comment)

        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id || blog.user,
            id: blog.id,
            comments: blog.comments
        }
        const commentObject= {
            comment: comment
        }
        try {
            await dispatch(commentBlog(blogObject,commentObject))
            setComment('')
        }catch (e) { console.log(e.message)
        }

    }

    const comments = () => {
        console.log('kommentut',blog.comments)
        if (!blog.comments || blog.comments.length===0){
            return <div>This blog doesn't have any comments yet.</div>
        }
        return <ul>{blog.comments.map(c =><li key={c.id}>{c.comment}</li>)}</ul>

    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
                <a href={blog.url}>{blog.url}</a>
                <div>Likes {blog.likes}
                    <button id='like' onClick={likeBlog}>like</button>
                </div>
                <div>added by {blog.user.username}</div>
                <button id='remove-blog' style={showForOwnerOnly} onClick={removeBlog}>remove</button>
            <h2>comments</h2>
            <input value={comment} onChange={({target})=>setComment(target.value)}/>
            <button onClick={addComment}>add comment</button>
                {comments()}
        </div>
    )
}

export default Blog
