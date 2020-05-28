import React from 'react'
import {Link} from "react-router-dom";
import { Navbar,Nav, Button} from "react-bootstrap";

const Menu = ({loggedUser,handleLogout}) => {

    const style = {
        paddingRight: 5,
        backgroundColor: 'gainsboro'
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">blogs
                    </Nav.Link>
                    <Nav.Link href='/users'>users
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link eventKey="disabled" disabled>
                    {loggedUser.username} logged in
                    </Nav.Link>
                        <Button variant='light' onClick={handleLogout}>logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Menu