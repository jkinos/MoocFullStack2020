import React from "react";
import {Link} from "react-router-dom";

const UserList = ({users}) => {

    return(
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                <tr>
                    <th> </th><th><h3>blogs created</h3></th>
                </tr>
                </thead>
                <tbody>
            {users.map(user=>
                <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
            )}
            </tbody>
            </table>
        </div>
    )
}
export default UserList