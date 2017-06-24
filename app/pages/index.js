import React from 'react';
import {
    Card,
    CardText,
    CardBlock,
    CardTitle,
    CardSubtitle,
    Button,
    CardLink,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

const style = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
};

export default (url) => (
    <div style={style}>
        <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />
        <div style={{ width: '300px', }}>
            <Card>
                <CardBlock>
                    <CardTitle>Multus Login</CardTitle>
                    <CardSubtitle color="red">
                        <small style={{ color: "red" }}></small>
                    </CardSubtitle>
                </CardBlock>

                <Form action="/auth/local" method="post">
                    <FormGroup>
                        <Label for="exampleEmail" hidden>Email</Label>
                        <Input type="email" name="username" id="username" placeholder="Email" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Label for="examplePassword" hidden>Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    {' '}
                    <Button>Submit</Button>
                </Form>

                <CardBlock>
                    <CardLink href="#">Contact</CardLink>
                </CardBlock>

            </Card>
        </div >
    </div>
);