import React, {useState,useEffect} from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Notify from "./Notify";

const Login = ({ setError, setToken, errorMessage, setPage }) => {
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')

    const [ login,result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })
    useEffect(() => {
        if ( result.data ) {
            console.log('-->', result.data)
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-app-user-token', token)
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()

        login({
            variables: { username, password }
        })
    }

    return(
        <div>
            <Notify errorMessage={errorMessage} />
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>username<input onChange={({target})=> setUsername(target.value)}/></div>
                <div>password<input type='password' onChange={({target})=> setPassword(target.value)}/></div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}
export default Login