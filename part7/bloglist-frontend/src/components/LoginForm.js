import React from 'react'
import PropTypes from 'prop-types'

const LoginForm =
    ({
         username,
         password,
         handleUsernameChange,
         handlePasswordChange,
         handleLogin
    }) => {
    return (
        <form onSubmit={handleLogin} >
            <div>
                username: <input id='username' type='text' value= { username } name='Username' onChange= { handleUsernameChange } />
            </div>
            <div>
                password: <input id='password' type='password' value= { password } name='Password' onChange= { handlePasswordChange } />
            </div>
            <div>
                <button id='login-button' type="submit">login</button>
            </div>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm