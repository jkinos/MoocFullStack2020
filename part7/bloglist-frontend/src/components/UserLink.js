import React from "react";
import {Link} from "react-router-dom"

import '../App.css'

const User = ({user}) => {
    if(!user) {
        return null
    }

    return(
    <tr>
    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
    <td>{user.blogs.length}</td>


    </tr>
)
}
export default User