import React from "react";

const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleLogin}) => {

    return (
        <form onSubmit={handleLogin}>
            <div>
                username: <input type='text' value={username} name='Username' onChange={handleUsernameChange}/>
            </div>
            <div>
                password: <input type='password' value={password} name='Password' onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="submit">login</button>
            </div>
        </form>
    )
}
export default LoginForm