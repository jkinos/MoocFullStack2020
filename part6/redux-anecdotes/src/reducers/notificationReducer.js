
export const setNotification = (notification, time) => {
    return async dispatch => {
        const milliseconds = time * 1000
        dispatch({
        type: 'NOTIFICATION',
        data: {
            notification: notification
        }
        })
        setTimeout(() => {
            dispatch(timeout())
        }, milliseconds)
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