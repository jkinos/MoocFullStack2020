import React from "react";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import {login} from "../reducers/loginReducer";
import {setError} from "../reducers/errorReducer";
import {useDispatch} from "react-redux";
import {FiLogIn} from 'react-icons/fi'

const Login = ({username, password, setUsername, setPassword}) => {
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await dispatch(login(username,password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setError('wrong password or username',5))        }
    }
    const loginForm = () => {
        return (
            <Togglable buttonLabel='login' variant='outline-light'image={<FiLogIn/>}>
                <LoginForm
                    username={ username }
                    password={ password }
                    handleUsernameChange={ ({ target }) => setUsername(target.value) }
                    handlePasswordChange={ ({ target }) => setPassword(target.value) }
                    handleLogin={ handleLogin }
                />
            </Togglable>
        )
    }
    return (
        <div>
            { loginForm() }
        </div>
    )
}
export default Login