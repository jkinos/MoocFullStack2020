import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from "./components/Filter"
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import ConnectedNotification from "./components/Notification";

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    },[dispatch])


    return (
    <div>
        <h2>Anecdotes</h2>
        <Filter/>
        <AnecdoteForm/>
        <ConnectedNotification/>
        <AnecdoteList/>
    </div>
  )
}

export default App