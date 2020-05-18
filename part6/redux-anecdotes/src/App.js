import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from "./components/Filter"
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService
            .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
    }, [dispatch])


    return (
    <div>
        <h2>Anecdotes</h2>
        <Filter/>
        <AnecdoteForm/>
        <AnecdoteList/>
    </div>
  )
}

export default App