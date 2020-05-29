import React from "react";
import {Link} from "react-router-dom"
import {Table} from 'react-bootstrap'

const User = ({user}) => {

        return (
            <div>
                <h1>{user.username}</h1>
                <br/>
                <Table striped>
                    <thead>
                    <tr>
                        <th>added blogs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.blogs.map(blog => <tr key={blog.id}><td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td></tr>)}
                </tbody>
                </Table>
            </div>
    )
}
export default User