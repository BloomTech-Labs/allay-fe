import React, { useState } from "react";
import {TextField, Button} from '@material-ui/core';
import styled from 'styled-components';
import {Link} from "react-router-dom" 

const FormContainer = styled.div`
    margin: 10px;
    width: 20rem;
    height: 24rem;
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

const Signup = () => {
    
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
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <FormContainer>
                    <FormTitle>
                        <h3>Signup</h3>
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
                            type="email"
                            label="Email" 
                            value={creds.email}
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
                    <FormInput>
                        <TextField 
                            id="outlined-basic" 
                            type="password"
                            label="Confirm Password" 
                            value={creds.confirmPassword}
                            onChange={handleChanges}
                        />
                    </FormInput>
                    <FormButton>
                        <Button variant="contained">Signup</Button>
                    </FormButton>
                    <FormLink>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </FormLink>
                </FormContainer>
            </form>
        </div>
    )
}

// mapStateToProps = () => {

// }

export default Signup;