import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

const Error = () => {
    const error= useSelector(state => state.error)
    if (error===null) {
        return ''
    }else {
        return (
            <div className='error'>
                {error}
            </div>
        )
    }
}

export default Error
