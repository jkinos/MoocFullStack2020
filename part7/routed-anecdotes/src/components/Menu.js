import React from "react"
import {
    BrowserRouter as Router,
    Switch, Route, Link,  useRouteMatch
} from "react-router-dom"

import AnecdoteList from "./Menu_components/AnecdoteList";
import CreateNew from "./Menu_components/CreateNew";
import About from "./Menu_components/About";
import Footer from "./Menu_components/Footer";
import Anecdote from "./Menu_components/Anecdote";

const Menu = ({addNew, anecdotes ,notification, setNotification}) => {

    const match = useRouteMatch('/anecdotes/:id')
    const anecdote = match
        ? anecdotes.find(a => a.id === Number(match.params.id))
        : null

    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
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
            </Router>
            )
        }
export default Menu