import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from "react-router-dom";
import Button from "./Components/Buttons/Button";
import ContactDetailPortal from "./Components/ContactDetailPortal";

const portalRoot = document.getElementById('contacts-listing-portal-root');

export class ContactListingsPortal extends Component {

    constructor(props) {
        super(props);
        this.state = this.getValidState(this.props.pathname);
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            this.setState(this.getValidState(location.pathname))
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleButtonClick = (btnType) => {
        this.props.history.push(btnType)
    }

    getValidState = (btnType) => {
        let open = false;
        let name = '';
        if(btnType === '/a' || btnType === '/b') {
            open = true;
            name = (btnType[1]).toUpperCase();
        }
        let stateData = {open: open, name: name, pathname: this.props.pathname, clickedContact: 0, contactOpen: false}
        return stateData
    }

    handleContactClick = (contact) => {
        this.setState({'clickedContact': contact, contactOpen: true})
    }

    render() {
        return ReactDOM.createPortal(this.renderPortal(), portalRoot);
    }

    renderListings = () => {
        if(this.state.name === 'A'){
            return (
                <p> Show all contacts listing here </p>
            )
        }else if(this.state.name === 'B'){
            return (
                <p> Show US contacts listing here </p>
            )
        }
    }

    renderSearch = () => {
        return (
            <form action="">
                <div className="form-group">
                    <label htmlFor="searchField">Search</label>
                    <input type="text" className="form-control" id="searchField"/>
                </div>
            </form>
        )
    }

    renderPortal() {
        return (
            <Fragment>
                <div id="contactListingsModalCenter" className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="contactListingsModalCenterTitle" style={{display:'block', 'background': '#000000f0'}}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="contactListingsModalCenterTitle">Modal {this.state.name}</h5>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        {this.renderSearch() }
                                        {this.renderListings() }
                                        <ul className="list-group">
                                            <li className="list-group-item" onClick = {() => this.handleContactClick(1)}>Contact 1</li>
                                            <li className="list-group-item" onClick = {() => this.handleContactClick(2)}>Contact 2</li>
                                            <li className="list-group-item" onClick = {() => this.handleContactClick(3)}>Contact 3</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center">
                                    <Button btnType="a" label="All Contacts" callMeOnClick = {() => this.handleButtonClick('/a')} />
                                    <Button btnType="b" label="US Contacts" callMeOnClick = {() => this.handleButtonClick('/b')} />
                                    <Button btnType="c" label="Close" callMeOnClick = {() => this.handleButtonClick('/')} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row justify-content-center align-items-left">
                                    <input type="checkbox"/>
                                </div>
                                <ContactDetailPortal open={this.state.contactOpen} contact={this.state.clickedContact}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default function(props) {
    const history       = useHistory();
    const {pathname}    = useLocation();
    return <ContactListingsPortal {...props} history={history} pathname={pathname}/>;
}
