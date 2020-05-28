import React from "react";
import {Link} from "react-router-dom"

const User = ({user}) => {

        return (
            <div>
                <h1>{user.username}</h1>
                <h3>added blogs</h3>
                <ul>
                    {user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
                </ul>
            </div>

    )
}
export default User