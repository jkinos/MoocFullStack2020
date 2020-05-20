import React from "react"
import {
    useHistory
} from 'react-router-dom'
import { useField } from "../hooks";

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes:0
        })
        history.push('/')
        props.setNotification(`succesfully added '${content.value}'`)
        setTimeout(() =>{props.setNotification('')},10000)
    }

    const handleReset = () => {
        content.onReset()
        author.onReset()
        info.onReset()
    }


    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content}/>
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button>
            </form>
            <button onClick={handleReset}>reset</button>
        </div>
    )

}
export default CreateNew