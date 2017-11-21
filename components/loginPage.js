import React from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from "reactstrap";
import classNames from "classnames";

// TODO Might be a hack but works well was not able to solve solution
// const { STAGING: staging = false } = 'undefined' !== typeof window ? window.env : process.env;

export default ({ error = "", staging = false }) => (
  <section
    className={classNames({
      root: true,
      staging
    })}
  >
    <style jsx>
      {`
        .root {
          background-color: #3079c6;
          height: 100vh;
        }

        .staging {
          background-color: #e88834;
        }

        .login_box {
          width: 450px;
          margin: 0px auto;
          float: none;
          background-color: #fff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          padding: 30px 15px;
          border-radius: 10px;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          margin-top: 25vmin;
        }

        .login_form h1 {
          color: #000;
          font-size: 25px;
          font-weight: 700;
          margin: 0px 0px 30px 0px;
          text-align: center;
        }
        .login_form input {
          background: transparent none repeat scroll 0 0;
          color: #000;
          font-size: 14px;
          height: 40px;
          border: 0px;
          border: 1px solid #ccc;
          padding-top: 9px;
        }
        .form-control:focus {
          background-color: transparent;
          border-color: #ddd;
          color: #000;
          outline: 0 none;
        }

        .form-control::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: #b2b2b2;
          font-size: 12px;
        }

        .form-control::-moz-placeholder {
          /* Firefox 19+ */
          color: #b2b2b2;
          font-size: 12px;
        }
        .form-control:-ms-input-placeholder {
          /* IE 10+ */
          color: #b2b2b2;
          font-size: 12px;
        }
        .form-control:-moz-placeholder {
          /* Firefox 18- */
          color: #b2b2b2;
          font-size: 12px;
        }
        .login_btn {
          border: 0 none;
          border-radius: 3px;
          display: block;
          height: 40px;
          margin: 30px auto 0px;
          min-width: 230px;
          background: #3079c6;
          color: #fff;
          font-size: 18px;
          font-weight: normal;
          text-transform: uppercase;
          padding: 0 20px;
          line-height: 40px;
        }
        .btn-secondary.focus,
        .btn-secondary:focus {
          box-shadow: none;
          -webkit-box-shadow: none;
        }
        .login_btn:hover {
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
        }
        .login_form p {
          margin: 0;
          padding: 10px 0;
          text-align: center;
        }
        .login_form p a {
          font-size: 16px;
          color: #797979;
        }
        .login_form .acc_crt {
          float: left;
          margin: 30px 0 0;
          width: 100%;
          color: #999;
        }

        .login_form .acc_crt a {
          color: #3079c6;
          font-size: 16px;
        }
      `}
    </style>
    <Container fluid>
      <Row>
        <div className="login_box">
          <div className="login_form">
            <h1 className="text-center">MULTUS</h1>
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
                  <Input
                    type="email"
                    name="username"
                    placeholder="Username"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="pwd">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <Button color="primary" className="login_btn" type="submit">
                  Sign In
                </Button>
              </Form>
            </Container>
          </div>
        </div>
      </Row>
    </Container>
  </section>
);
