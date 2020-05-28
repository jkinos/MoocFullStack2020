import userService from '../services/users'

export const updateUserBlogs = (user,blog) => {
    const id = user.id
    console.log('id', id)
    return async dispatch => {
        dispatch({
            type: 'UPDATE_BLOGS',
            data: {
                id: id,
                blog: blog
            }
        })
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users,
        })
    }

}

const userReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'UPDATE_BLOGS':
            const id = action.data.id
            const userToUpdate = state.find(u => u.id === id)
            const updatedUser = {
                ...userToUpdate, blogs: userToUpdate.blogs.concat(action.data.blog)
            }
            return state.map(user => user.id !== id ? user : updatedUser)
        case
        'INIT_USERS':
            return action.data
        default:
            return state
    }
}

export default userReducer