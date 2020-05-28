import React from 'react'
import {Link} from "react-router-dom";

const Menu = ({loggedUser,handleLogout}) => {

    const style = {
        paddingRight: 5,
        backgroundColor: 'gainsboro'
    }

    const padding = {
        paddingRight: 5,
    }
    return (
        <div style={style}>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            {loggedUser.username} logged in <button onClick={handleLogout}>logout</button>
        </div>
    )
}
export default Menu