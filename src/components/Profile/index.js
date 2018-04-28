import React, { Component } from "react";
import './index.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">My Profile</h3>
                    <Container>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleFname">First Name</Label>
                                                <Input type="text" name="fname" id="exampleFname" placeholder="First name placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleLname">Last Name</Label>
                                                <Input type="text" name="lname" id="exampleLname" placeholder="Last name placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail">Email</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="Email placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleNumber">Phone Number</Label>
                                                <Input type="number" name="number" id="exampleNumber" placeholder="Phone number placeholder" />
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <div class="d-flex justify-content-center mt-5 pb-5">
                            <SuccessOutlineButton><a href={'/'} className="text-uppercase px-5">Save Changes</a></SuccessOutlineButton>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}