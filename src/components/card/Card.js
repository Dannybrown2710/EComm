import React from 'react';
import './Card.css'

export default class Card extends React.Component {
    render(){
        return(
            <div className={`card ${ this.props.className }`} style={{minHeight: `${ this.props.min_height }rem`}}>
                {this.props.children}
            </div>
        );
    }
}

Card.defaultProps = {
    min_height: '10'
};
