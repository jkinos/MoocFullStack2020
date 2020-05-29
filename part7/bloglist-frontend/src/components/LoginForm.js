import React from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Col, Row} from "react-bootstrap";

const LoginForm =
    ({
         username,
         password,
         handleUsernameChange,
         handlePasswordChange,
         handleLogin
    }) => {
    return (
            <Form onSubmit={handleLogin}>
                <Form.Group as={Row}>
                    <Form.Label style={{color:'gainsboro',minWidth:100}} column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control placeholder='Username'id='username' type='text' value= { username } name='Username' onChange= { handleUsernameChange } />
                    </Col>
                </Form.Group>


                <Form.Group as={Row}>
                    <Form.Label style={{color:'gainsboro', minWidth:100}} column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control placeholder='Password' id='password' type='password' value= { password } name='Password' onChange= { handlePasswordChange } />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10}}>
                <Button variant='dark' id='login-button' type="submit">login</Button>
                    </Col>
                </Form.Group>
        </Form>
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