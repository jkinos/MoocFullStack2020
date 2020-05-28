import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'


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

        <Form id='blogForm' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control
                    id='title'
                    value={title}
                    name='Title'
                    onChange={handleTitleChange}/>
                <Form.Label>author:</Form.Label>
                <Form.Control
                    id='author'
                    value={author}
                    name='Author'
                    onChange={handleAuthorChange}/>
                <Form.Label>url:</Form.Label>
                <Form.Control
                    id='url'
                    value={url}
                    name='Author'
                    onChange={handleUrlChange}/>
                <Button
                    variant="primary"
                    id='create'
                    type="submit">
                    create
                </Button>
            </Form.Group>
        </Form>
    )
}
export default BlogForm