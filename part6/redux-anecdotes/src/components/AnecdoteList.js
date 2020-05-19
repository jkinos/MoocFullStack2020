import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {

    const anecdotes = useSelector(({anecdotes,filter}) => {
            return (
                anecdotes.sort(((a, b) => b.votes - a.votes))
                    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.trim().toLowerCase()))
            )
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return(
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
        </div>
        )
}
export default AnecdoteList