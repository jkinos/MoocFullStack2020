import blogService from '../services/blogs'
import commentService from '../services/comments'

export const like = (blog) => {
    const id = blog.id
    console.log('id', id)
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blog)
        dispatch({
            type: 'LIKE',
            data: updatedBlog
        })
    }
}

export const commentBlog = (blog,comment) => {
    const id = blog.id
    console.log('id', id)
    return async dispatch => {
        const newComment = await commentService.create(id, comment)
        dispatch({
            type: 'COMMENT',
            data: {blog: blog, comment: newComment}
        })
    }
}


export const createBlog = updatedBlog => {
    return async dispatch => {
        dispatch({
            type: 'NEW_BLOG',
            data: updatedBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }

}

export const remove = id => {
    return async dispatch => {
        const blogToRemove = await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: {
                id: id,
                response: blogToRemove
            }
        })
    }
    }


const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'LIKE':
            const id = action.data.id
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike, likes: blogToLike.likes + 1
            }
            return state.map(blog => blog.id !== id ? blog : likedBlog)
        case 'COMMENT':
            const blogId = action.data.blog.id
            const comment = action.data.comment
            const blogToComment = state.find(b => b.id === blogId)
            console.log(blogToComment)
            const commentedBlog = {
                ...blogToComment, comments: [...blogToComment.comments,comment]
            }
            return state.map(blog => blog.id !== blogId ? blog : commentedBlog)
        case 'NEW_BLOG':
            const newBlog = {
                title: action.data.title,
                author: action.data.author,
                url: action.data.url,
                likes: action.data.likes,
                id: action.data.id,
                user: action.data.user,
                comments: []
            }
            return state.concat(newBlog)
        case 'INIT_BLOGS':
            return action.data.sort((a, b) => b.likes - a.likes)
        case 'REMOVE_BLOG':
            const idToRemove = action.data.id
            console.log('idToremove',idToRemove)

            return state.filter(blog => blog.id !== idToRemove)
        default:
            return state
    }
}

export default blogReducer