import blogService from '../services/blogs'

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

export const createBlog = content => {
    console.log('content',content)
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
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

export const removeBlog = id => {
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
        case 'NEW_BLOG':
            const newBlog = {
                title: action.data.title,
                author: action.data.author,
                url: action.data.url,
                likes: action.data.likes,
                id: action.data.id,
                user: action.data.user
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