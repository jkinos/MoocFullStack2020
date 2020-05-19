
let timeoutID
export const setNotification = (message, time) => {
    window.clearTimeout(timeoutID);
    return async dispatch => {
        const milliseconds = time * 1000
        const timeoutSetter = () => {
            timeoutID = window.setTimeout(() => {
                dispatch(timeout())
            }, milliseconds)
        }
        dispatch({
        type: 'NOTIFICATION',
        data: {
            notification: message,
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

const notificationReducer = (state = null, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.notification
        case 'TIMEOUT':
            return null
        default:
            return state
    }
}

export default notificationReducer