
let timeoutID
export const setError = (message, time) => {
    window.clearTimeout(timeoutID);
    return async dispatch => {
        const milliseconds = time * 1000
        const timeoutSetter = () => {
            timeoutID = window.setTimeout(() => {
                dispatch(timeout())
            }, milliseconds)
        }
        dispatch({
            type: 'ERROR',
            data: {
                error: message,
            }
        })
        timeoutSetter()
    }
}

export const timeout = () => {
    return {
        type:'TIMEOUT'
    }
}

const errorReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'ERROR':
            return action.data.error
        case 'TIMEOUT':
            return null
        default:
            return state
    }
}

export default errorReducer