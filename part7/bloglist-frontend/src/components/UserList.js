import React from "react";
import {Link} from "react-router-dom";
import {Table} from 'react-bootstrap'

const UserList = ({users}) => {

    return(
        <div>
            <h1>Users</h1>
            <br/>
            <Table striped>
                <thead>
                <tr>
                    <th>User</th><th>Blogs created</th>
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
            </Table>
        </div>
    )
}
export default UserList