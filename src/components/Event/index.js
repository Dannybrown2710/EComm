import React, { Component } from "react";
import './event.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Event extends Component {
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">Add Event</h3>
                    <Container>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleTitle">Title</Label>
                                                <Input type="text" name="title" id="exampleTitle" placeholder="Title placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleLocation">Location</Label>
                                                <Input type="text" name="location" id="exampleLocation" placeholder="Location placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleDate">Date</Label>
                                                <Input type="date" name="date" id="exampleDate" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleDescription">Description</Label>
                                                <Input type="text" name="description" id="exampleDescription" placeholder="Description placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleImage">Image</Label>
                                                <Input type="file" name="image" id="exampleImage" placeholder="Image placeholder" />
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <div class="d-flex justify-content-center mt-5 pb-5">
                            <SuccessOutlineButton><a href={'/'} className="text-uppercase px-5">Save</a></SuccessOutlineButton>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}