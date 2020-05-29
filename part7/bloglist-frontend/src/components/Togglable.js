import React, { useState, useImperativeHandle } from 'react'
import {Button, Col, Form, Row,} from 'react-bootstrap'
import PropTypes from 'prop-types'
import '../App.css'

const Togglable = React.forwardRef((props, ref) =>  {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button id='toggleAction' variant={props.variant} onClick={toggleVisibility}>{props.buttonLabel} {props.image}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Form.Group as={Row}>
                <Col sm={{span:10}}>
                <Button id='toggleClose' variant={props.variant} onClick={toggleVisibility}>cancel</Button>
                </Col>
                </Form.Group>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable
