import React from 'react';

class ContactItem extends React.Component{

    constructor(props) {
        super(props);
        this.handleContactClick = this.handleContactClick.bind(this);
    }

    handleContactClick = () => {
        this.props.callContactClick()
    }

    render(){
        return (
            <li key={this.props.contact.id} className="list-group-item" onClick = {() => this.handleContactClick(this.props.contact)}>
                <p className={`contact-label-value`}>
                    <label className={`contact-label`}>ID: </label> <span className={`contact-value`}>{this.props.contact.id}</span>
                </p>
                <p className={`contact-label-value`}>
                    <label className={`contact-label`}>First Name: </label> <span className={`contact-value`}>{((this.props.contact.first_name !== null)?this.props.contact.first_name:'N/A')}</span>
                </p>
                <p className={`contact-label-value`}>
                    <label className={`contact-label`}>Last Name: </label> <span className={`contact-value`}>{((this.props.contact.last_name !== null)?this.props.contact.last_name:'N/A')}</span>
                </p>
                <p className={`contact-label-value`}>
                    <label className={`contact-label`}>Country (iso): </label> <span className={`contact-value`}>{((this.props.contact.country !== undefined)?this.props.contact.country.iso:'N/A')}</span>
                </p>
            </li>
        );
    }
}
export default ContactItem;
