import React, { useState } from 'react'

const Blog = ({ blog, user, like, remove}) => {
    const [showBlogDetails, setShowBlogDetails] = useState(false)
    const [buttonLabel, setButtonLabel] = useState('view')
    const showOrHide = { display: showBlogDetails ? '' : 'none' }
    const showForOwnerOnly = { display: user.id === (blog.user.id || blog.user) ? '' : 'none', backgroundColor: 'blue' }

    const toggleView = () => {
        if (showBlogDetails) {
            setShowBlogDetails(false)
            setButtonLabel('view')
        } else {
            setShowBlogDetails(true)
            setButtonLabel('hide')
        }
    }

    const likeBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id || blog.user,
            id: blog.id
        }
        like(blogObject)
    }



    const removeBlog = (event) => {
        event.preventDefault()
        const message = `Remove blog ${blog.title} by ${blog.author}`
        if (window.confirm(message)) {
            remove(blog.id)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        listStyle:'none'
    }

    return (
        <div className='blog' style={blogStyle}>
            <div>{blog.title} {blog.author} <button id='viewOrHide' onClick={toggleView}>{buttonLabel}</button></div>
            <div style= {showOrHide} className='showOrHide'>
                <div>{blog.url}</div>
                <div>Likes {blog.likes} <button id='like' onClick={likeBlog}>like</button></div>
                <div>{blog.user.username}</div>
                <button id='remove-blog' style={showForOwnerOnly} onClick={removeBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog
