import React, { useState } from 'react'
import {like, remove,commentBlog} from "../reducers/blogReducer";
import {useDispatch} from "react-redux";
import {
    useHistory
} from 'react-router-dom'
import { Table, Form, Button,Card } from 'react-bootstrap'
import {AiFillDelete, AiFillLike } from 'react-icons/ai'


const Blog = ({ user, blog }) => {

    const showForOwnerOnly = () => {
        if(!user) {
            return {display: 'none'}
        }
            return {display: user.id === (blog.user.id || blog.user) ? '' : 'none'}
        }

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

        if (!blog.comments || blog.comments.length===0){
            return <tbody><tr><td>This blog doesn't have any comments yet.</td></tr></tbody>
        }
        return <tbody>{blog.comments.map(c =><tr key={c.id}><td>{c.comment}</td></tr>)}</tbody>

    }

    const commentForm = () =>
            <Form onSubmit={addComment}>
                <Form.Group>
                    <Form.Control as="textarea" rows="3" placeholder='Write your comment here...' value={comment} onChange={({target})=>setComment(target.value)} />
                </Form.Group>
                <Form.Group>
                    <Button id='addComment' variant='dark' type="submit">add comment</Button>
                </Form.Group>
            </Form>


    return (
        <div>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title><h1>{blog.title}</h1></Card.Title>
                    <Card.Title><a href={blog.url}>{blog.url}</a></Card.Title>
                    <Card.Title>written by {blog.author}</Card.Title>
                    <Card.Text>
                        has {blog.likes} likes
                    </Card.Text>
                    <Button variant='dark' id='like' onClick={likeBlog}><AiFillLike/> like</Button>{' '}
                    <Button variant='dark' id='remove-blog' style={showForOwnerOnly()} onClick={removeBlog}>remove <AiFillDelete/></Button>
                </Card.Body>
                <Card.Footer className="text-muted">added by {blog.user.username}</Card.Footer>
            </Card>

            <br/>
            <br/>
            {commentForm()}
            <br/>
            <Table striped>
                <thead><tr><th>Comments</th></tr></thead>
                {comments()}
            </Table>
            <br/>
        </div>
    )
}

export default Blog
