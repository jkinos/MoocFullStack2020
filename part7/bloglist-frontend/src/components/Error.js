import React from 'react'
import { useSelector } from 'react-redux'
import {Alert} from "react-bootstrap";

const Error = () => {
    const error= useSelector(state => state.error)
    if (error===null) {
        return ''
    }else {
        return (
            <Alert variant="warning">
                {error}
            </Alert>
        )
    }
}

export default Error
