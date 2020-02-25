import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import signup from "../../state/actions/index";
// import { BrowserRouter as Router } from "react-router-dom";

const FormContainer = styled.div`
  margin: 20px auto;
  width: 22rem;
  height: 22.5rem;
  border: 2px solid lightgray;
`;

const FormTitle = styled.h3`
  background: lightgray;
`;

const FormInput = styled.div`
  margin: 10px;
`;
const FormButton = styled.p`
  margin: 15px;
`;

const FormLink = styled.p`
  margin: 15px;
`;

const Signup = props => {
  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChanges = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const submitForm = e => {
    e.preventDefault();
    console.log("form submitted");
    if (creds.confirmPassword === creds.password) {
      props
        .signup({
          username: creds.username,
          email: creds.email,
          password: creds.password
        })
        .then(() => props.history.push("/dashboard"));
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <FormContainer>
          <FormTitle>Signup</FormTitle>
          <FormInput>
            <TextField
              variant="filled"
              type="text"
              label="Username"
              name="username"
              value={creds.username}
              onChange={handleChanges}
            />
          </FormInput>
          <FormInput>
            <TextField
              variant="filled"
              type="email"
              label="Email"
              name="email"
              value={creds.email}
              onChange={handleChanges}
            />
          </FormInput>
          <FormInput>
            <TextField
              variant="filled"
              type="password"
              label="Password"
              helperText="At least 8 characters"
              name="password"
              value={creds.password}
              onChange={handleChanges}
            />
          </FormInput>
          <FormInput>
            <TextField
              variant="filled"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={creds.confirmPassword}
              onChange={handleChanges}
            />
          </FormInput>
          <FormButton>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </FormButton>
          <FormLink>
            Already have an account? <Link to="/login">Login</Link>
          </FormLink>
        </FormContainer>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, signup)(Signup);
