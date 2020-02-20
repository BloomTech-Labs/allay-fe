import React, { useState } from "react";
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../state/actions/authActions";

const FormContainer = styled.div`
    margin: 10px;
    width: 20rem;
    height: 16rem;
    border: 2px solid lightgray;
`

const FormTitle = styled.h3`
    background: lightgray;
`

const FormInput = styled.div`
    margin: 10px;
`
const FormButton = styled.p`
    margin: 15px;
`

const FormLink = styled.p`
    margin: 15px;
`


const Login = props => {

    const [creds, setCreds] = useState({
        username: "", 
        password: "",
    });

    const handleChanges = e => {
        setCreds({
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault();
        // action function here
        props.login(creds)
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <FormContainer>
                    <FormTitle>
                        <h3>Login</h3>
                    </FormTitle>
                    <FormInput>
                        <TextField 
                            id="outlined-basic" 
                            type="text"
                            label="Username"
                            value={creds.username}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormInput>
                        <TextField 
                            id="outlined-basic" 
                            type="password"
                            label="Password"
                            value={creds.password}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormButton>
                        <Button variant="contained">Login</Button>
                    </FormButton>
                    <FormLink>
                        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                    </FormLink>
                </FormContainer>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { login })(Login);