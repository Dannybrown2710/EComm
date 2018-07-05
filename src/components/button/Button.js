import React, { Component } from 'react';
import './button.css';
import { Button } from 'reactstrap';

export default class SuccessOutlineButton extends Component {
    render() {
        return (
            <Button className="button" >{this.props.children}</Button>
        );
    }
}
// Specifies the default values for props:
SuccessOutlineButton.defaultProps = {
    children: 'Outline'
};