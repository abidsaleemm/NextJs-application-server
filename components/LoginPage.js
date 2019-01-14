import React from "react";
import {
  Container,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export default ({ error = "", staging = false }) => (
  <section className="root">
    <style jsx>
      {`
        .root {
          background-color: ${staging ? "#e88834" : "#3079c6"};
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
        }

        .loginImage {
          width: 430px;
        }

        .login_box {
          margin: auto;
          background-color: #fff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          padding: 30px 15px;
          border-radius: 10px;
        }

        .login_form h1 {
          margin: 0px 0px 30px 0px;
        }
      `}
    </style>

    <div className="login_box">
      <div className="login_form">
        <h1 className="text-center">
          <img className="loginImage" src="static/public/logo.png" />
        </h1>
        <Alert color="danger" hidden={!error}>
          <strong>{error}</strong>
        </Alert>
        <Container>
          <Form
            method="POST"
            action="/auth/local"
            className="login-form-container"
          >
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Input type="email" name="username" placeholder="Username" />
            </FormGroup>
            <FormGroup>
              <Label for="pwd">Password</Label>
              <Input type="password" name="password" placeholder="Password" />
            </FormGroup>
            <Button color="primary" className="login_btn" type="submit">
              Sign In
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  </section>
);
