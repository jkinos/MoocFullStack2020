import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'

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

   if(!user) { return (
       <div><i>You're not logged in. Log in to add a blog</i></div>
   )
   }
   return(

        <Form id='blogForm' onSubmit={handleSubmit}>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Title</Form.Label>
                <Col sm="10">
                <Form.Control
                    placeholder='blog'
                    id='title'
                    value={title}
                    name='Title'
                    onChange={handleTitleChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Author</Form.Label>
                <Col sm="10">
                <Form.Control
                    placeholder='author'
                    id='author'
                    value={author}
                    name='Author'
                    onChange={handleAuthorChange}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="2">Url</Form.Label>
                <Col sm="10">
                <Form.Control
                    placeholder='https://someblog.com'
                    id='url'
                    value={url}
                    name='Author'
                    onChange={handleUrlChange}/>
                    <br/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10}}>
                <Button variant='dark'
                    id='create'
                    type="submit">
                    create
                </Button>
                </Col>
            </Form.Group>

        </Form>
    )
}
export default BlogForm