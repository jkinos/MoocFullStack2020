import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'

const Notification = () => {
    const notification= useSelector(state => state.notification)

    if (notification===null) {
        return ''
    }else {
        return (
            <div className='success'>
                {notification}
            </div>
        )
    }
}

export default Notification
