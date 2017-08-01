import React from 'react';
// import { Grid, Row, Col, Alert, FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { Container, Row, Col, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Navbar from '../components/nav';

const style = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
};

export default class extends React.Component {
    /**
     * callback when the route hit
     * @param {} param0 
     */
    static getInitialProps({ req: { session } }) {
        let props = {};
        if (session.sessionFlash !== undefined) {
            props = { ...session.sessionFlash };
            session.sessionFlash = {}
        }
        return props;
    };

    screenReso(type) {
        if (type == 'width') {
            return 1400 / 2 - 350;
        } else {
            return 800 / 2 - 300;
        }

        //console.log(Dimensions.get('window'))
    }
    render() {
        const { props: { error = '' } = {} } = this;
        return (
            <section>
                <Navbar def='login' />
                <br/><br/><br/><br/>
                <Container className='app-container'>
                    <Row>
                        <Col md="4" sm={2} xs={1}></Col>
                        <Col md="4" sm={8} xs={10}>
                            <h2 className='text-center'>
                                <img src='https://react.semantic-ui.com/logo.png' width='50' height='50' /><br />
                                Multus Login
                            </h2>

                            <Alert color="danger" hidden={!error}>
                                <strong>{ error }</strong>
                            </Alert>

                            <Container>
                                <Form method='POST' action='/auth/local' className='login-form-container'>
                                    <FormGroup>
                                        <Label for='loginEmail'>Email</Label>
                                        <Input type='email' name='username' placeholder='Email'/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='loginEmail'>Password</Label>
                                        <Input type='password' name='password' placeholder='Password'/>
                                    </FormGroup>
                                    <Button type='submit'> Submit </Button>
                                </Form>
                            </Container>
                        </Col>
                        <Col md="4" sm={2} xs={1}></Col>
                    </Row>
                </Container>
                {/*<br /><br />
                <Grid className='app-container'>
                    <Col md={4} sm={2} xs={1}></Col>
                    <Col md={4} sm={8} xs={10}>
                        <h2 className='text-center'>
                            <img src='https://react.semantic-ui.com/logo.png' width='50' height='50' /><br />
                            Multus Login
                        </h2>
                        <Alert bsStyle="danger" hidden={!error}>
                            <strong>{error}</strong>
                        </Alert>
                        <Form horizontal action='/auth/local' method='post' className='login-form-container'>
                            <FormGroup>
                                <Col sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl name='username' type="text" placeholder="Email" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={2}>
                                    Password
                                 </Col>
                                <Col sm={10}>
                                    <FormControl name='password' type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle='success' type="submit">
                                        Sign in
                                     </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <div>
                                    <a href={"javascript:window.open('/auth/azureadoauth2','_blank','left=" + this.screenReso('width') + ", top= " + this.screenReso('height') + ", height=600,width=700');"}>
                                        <label>Login with Windows Azure</label>
                                    </a>
                                </div>
                            </FormGroup>
                        </Form>
                    </Col>
                <Col md={4} sm={2} xs={1}></Col>
                </Grid>*/}
            </section >
        );
    }
}