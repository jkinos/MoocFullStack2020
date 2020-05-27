const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const Comment =require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments',{comment:1})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).populate('user',{username:1,name:1}).populate('comments',{comment:1})
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token

    if (!token || !token.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(token.id)

    const blog =  new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token

    if (!token || !token.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(token.id)
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === user._id.toString() ) {
        await blog.remove()
    } else {return response.status(401).json( {error: 'unauthorized method for this user'})}

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.user)

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: 'query'
    })
    response.json(updatedBlog.toJSON())
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).populate('comments',{comment:1})
    const comments = blog.comments

    response.json(comments.map(comment => comment.toJSON()))
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id)

    const comment =  new Comment({
        comment: body.comment,
        blog: blog.id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.json(savedComment.toJSON())
})


module.exports = blogsRouter