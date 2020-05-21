import React from "react"
import {
    Switch, Route, Link, useRouteMatch,
} from "react-router-dom"

import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";
import Footer from "./Footer";
import Anecdote from "./Anecdote";

const Menu = ({addNew, anecdotes ,notification, setNotification,vote}) => {

    const match = useRouteMatch('/anecdotes/:id')
    const anecdote = match
        ? anecdotes.find(a => a.id === Number(match.params.id))
        : null

    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <div>
                <Link style={padding} to='/'>anecdotes</Link>
                <Link style={padding} to='/create'>create new</Link>
                <Link style={padding} to='/about'>about</Link>
            </div>

            <Switch>
                <Route path="/anecdotes/:id">
                    <Anecdote anecdote={anecdote} />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/create">
                    <CreateNew addNew={addNew} setNotification={setNotification}/>
                </Route>
                <Route path="/">
                    <AnecdoteList anecdotes={anecdotes} notification={notification}/>
                </Route>
            </Switch>
            <Footer/>
            </div>
            )
        }
export default Menu