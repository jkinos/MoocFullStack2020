import loginService from "../services/login";
import blogService from "../services/blogs";

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password } )
        window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: {
                user: user,
            }
        })
    }
}

export const logout = () => {
    window.localStorage.clear()
    return {
        type:'LOGOUT'
    }
}

export const initializeLoggedUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'INIT_USER',
                data: {
                    user: user,
                }
            })
        }
    }
}

const loginReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'LOGIN':
            return action.data.user
        case 'LOGOUT':
            return null
        case 'INIT_USER':
            return action.data.user
        default:
            return state
    }
}

export default loginReducer