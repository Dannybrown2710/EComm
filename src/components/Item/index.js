import React, { Component } from "react";
import './item.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Item extends Component {
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">Add Item</h3>
                    <Container>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <CardBody>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleName">Name</Label>
                                                <Input type="text" name="name" id="exampleName" placeholder="Name placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleCategory">Category</Label>
                                                <Input type="text" name="category" id="exampleCategory" placeholder="Category placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleSubcategory">Subcategory</Label>
                                                <Input type="text" name="subcategory" id="exampleSubcategory" placeholder="Sub-Category placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleLocation">Location</Label>
                                                <Input type="text" name="location" id="exampleLocation" placeholder="Location placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="examplePrice">Price</Label>
                                                <Input type="text" name="price" id="examplePrice" placeholder="Price placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleCondition">Condition</Label>
                                                <Input type="text" name="condition" id="exampleCondition" placeholder="Condition placeholder" />
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