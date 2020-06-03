import React, {useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR} from '../queries'
import Notify from "./Notify";

const SetBirthyear = (props) => {
    const [born, setBorn]=useState('')
    const result = useQuery(ALL_AUTHORS)
    const authors = () => result.data.allAuthors
    const [name,setName]=useState('')


    const options = ()=> {
        if (result.loading) {
            return <option>''</option>
        }
        return authors().map(a => <option key={a.id} value={a.name}>{a.name}</option>)
    }

    const [ setBornYear ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [  {query: ALL_AUTHORS} ],
        onError: (error) => {
            props.setError('something went terribly wrong')
        }
    })

    const submit = async (event) => {
        event.preventDefault()
        const bornToInt= parseInt(born)

        setBornYear({
            variables: { name, setBornTo:bornToInt }
        })

        setName('')
        setBorn('')
    }


    if (!props.show) {
        return null
    }

    if (result.loading)  {
        return <div>loading...</div>
    }

    return (
        <div>
            <Notify errorMessage={props.errorMessage} />
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name:
                    <select value={name} onChange={({target}) => setName(target.value)}>
                        <option>select name</option>
                        {options()}
                    </select>
                </div>
                <div>
                    born:
                    <input value={born} type='number' onChange={({target}) => setBorn(target.value)}/></div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default SetBirthyear