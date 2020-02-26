import React, { useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import login from "../../state/actions/index";

const FormContainer = styled.div`
  margin: 20px auto;
  width: 22rem;
  height: 17rem;
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

const Login = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = e => {
    e.preventDefault();
    // action function here
    props.login(creds).then(() => props.history.push("/dashboard"));
  };

  if (props.isLoading) {
    return <h1>Logging you in</h1>;
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <FormContainer>
          <FormTitle>Login</FormTitle>
          <FormInput>
            <TextField
              id="outlined-basic"
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
              id="outlined-basic"
              variant="filled"
              type="password"
              label="Password"
              name="password"
              value={creds.password}
              onChange={handleChanges}
            />
          </FormInput>
          <FormButton>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </FormButton>
          <FormLink>
            Don't have an account? <Link to="/signup">Signup</Link>
          </FormLink>
        </FormContainer>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading
  };
};

export default connect(mapStateToProps, login)(Login);
