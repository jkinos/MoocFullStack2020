
export const filterAnecdotes = value => {
    return {
        type: 'FILTER',
        data: {
            value: value
        }
    }
}

const filterReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'FILTER':
            return action.data.value
        default:
            return state
    }
}

export default filterReducer