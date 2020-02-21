import React, { useState } from "react";
import {TextField, Button} from '@material-ui/core';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../state/actions/authActions"

const FormContainer = styled.div`
    margin: 20px auto;
    width: 22rem;
    height: 25rem;
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

const Signup = props => {
    
    const [creds, setCreds] = useState({
        username: "", 
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChanges = (e) => {
        setCreds({[e.targer.name]: e.target.value})
    }

    const submitForm = e => {
        e.preventDefault();
        // action function here
        props.signup(creds)
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <FormContainer>
                    <FormTitle>
                        Signup
                    </FormTitle>
                    <FormInput>
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            type="text"
                            label="Username" 
                            value={creds.username}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormInput>
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            type="email"
                            label="Email" 
                            value={creds.email}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormInput>
                        <TextField 
                            id="outlined-basic"
                            variant="outlined" 
                            type="password"
                            label="Password" 
                            value={creds.password}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormInput>
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined"
                            type="password"
                            label="Confirm Password" 
                            value={creds.confirmPassword}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormButton>
                        <Button variant="contained">Submit</Button>
                    </FormButton>
                    <FormLink>
                        {/* Already have an account? <Link to="/login">Login</Link> */}
                    </FormLink>
                </FormContainer>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return state
}

export default (Signup);