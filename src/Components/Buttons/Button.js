import React from 'react';

export default class Button extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.callMeOnClick()
    }

    render(){
        return (<button type="button" className={`btn btn-primary test-btn btn-${this.props.btnType.toLowerCase()}`} onClick={this.handleClick} disabled={this.props.disableMe}>{this.props.label.toUpperCase()}</button>);
    }

}