import React, { useState } from 'react'

const BlogForm = ({ addBlog, user }) => {
    const [title, setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleTitleChange =(event) => setTitle(event.target.value)
    const handleAuthorChange = (event) => setAuthor(event.target.value)
    const handleUrlChange = (event) => setUrl (event.target.value)

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(user.id)
        addBlog({
            title: title,
            author: author,
            url: url,
            user: user.id
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                title: <input value={title} name='Title' onChange={handleTitleChange}/>
            </div>
            <div>
                author: <input value={author} name='Author' onChange={handleAuthorChange}/>
            </div>
            <div>
                url: <input value={url} name='Author' onChange={handleUrlChange}/>
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}
export default BlogForm