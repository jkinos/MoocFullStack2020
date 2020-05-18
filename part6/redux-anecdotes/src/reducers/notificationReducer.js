
export const voteNotification = anecdote => {
    return {
        type: 'VOTE_NOTIFICATION',
        data: {
            anecdote: anecdote
        }
    }
}

export const newAnecdoteNotification = anecdote => {
    return {
        type: 'NEW_ANECDOTE_NOTIFICATION',
        data: {
            anecdote: anecdote
        }
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
        case 'VOTE_NOTIFICATION':
            const anecdote = action.data.anecdote
            console.log('anekdootti',anecdote)
            return `You voted ${anecdote}`

        case 'NEW_ANECDOTE_NOTIFICATION':
            const newAnecdote = action.data.anecdote
            return `Succesfully added ${newAnecdote}`
        case 'TIMEOUT':
            return null
        default:
            return state
    }
}

export default notificationReducer