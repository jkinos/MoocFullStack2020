import React, {useState} from 'react'
import { Navbar,Nav, Button} from "react-bootstrap";
import Login from "./Login";
import {logout} from "../reducers/loginReducer";
import {useDispatch} from "react-redux";
import {FiLogOut} from 'react-icons/fi'

const Menu = ({loggedUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
        setUsername('')
        setPassword('')
    }

    if(loggedUser===null){
        console.log('logged user', loggedUser)
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand id='brand' href="/">Blog App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/blogs">blogs</Nav.Link>
                        <Nav.Link href='/users'>users</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey="disabled" disabled>you are not logged in</Nav.Link>
                        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Blog App</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/blogs">blogs</Nav.Link>
                    <Nav.Link href='/users'>users</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link eventKey="disabled" disabled>{loggedUser.username} logged in</Nav.Link>
                    <Button id='logout' variant='outline-light' onClick={handleLogout}>logout <FiLogOut/> </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Menu