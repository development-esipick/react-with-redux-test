import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import ContactDetailPortal from "./ContactDetailPortal";
import Button from "../Buttons/Button";
import ContactItem from "./ContactItem";
import axios from "../../Config/axios";

const portalRoot = document.getElementById('contacts-listing-portal-root');

class ContactListingsPortal extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = this.getListingStateData(this.props.location.pathname);
        this.handleChecked = this.handleChecked.bind(this);
        this.signal = axios.CancelToken.source();
    }

    componentDidMount() {
        this._isMounted = true;
        this.unlisten = this.props.history.listen((location) => {
            if(location.pathname !== '/')
                this.setState(this.getListingStateData(location.pathname), () => this.getContactsFromApi());
        });
        this.getContactsFromApi();
        this.observer = new IntersectionObserver(this.handleObserver.bind(this),{}).observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y && this.state.totalContacts > this.state.contactIds.length)
            this.getContactsFromApi();
        this.setState({ prevY: y });
    }

    componentWillUnmount() {
        this.signal.cancel('Component Unmounted');
        this.unlisten();
    }

    handleButtonClick = (btnType) => {
        this.props.history.push(btnType)
    }

    getListingStateData = (pathName) => {
        return {contactIds:[], checked: false, name: pathName[1].toUpperCase(), pathname: pathName, totalContacts: 0, contactOpen: false, currentPage: 1, contacts: {}, isLoading: false, contactSearchQuery: ''};
    }

    handleContactClick = (contact) => {
        this.setState({'contactDetail': contact, contactOpen: true})
    }

    render() {
        return ReactDOM.createPortal(this.renderPortal(), portalRoot);
    }

    renderListings = () => {
        if(this.state.contacts !== undefined)
            return (
                this.state.contactIds.map((keyContactId) => {
                    let contact = this.state.contacts[keyContactId];
                    return <ContactItem key={keyContactId} contact={contact} callContactClick = {() => this.handleContactClick(contact)}/>
                })
            )
    }

    getContactsFromApi = () => {
        let self = this
        self.setState({isLoading: true}, () => {
            let request = {
                companyId : 171,
                page  : self.state.currentPage
            };
            self.setState({currentPage: (parseInt(self.state.currentPage)+1)})
            if(self.state.name === 'B') { //filter only US contacts
                //  :: IMPORTANT (your api is not returning only US contacts i have send same paramas mentioned)
                request.countryId = 226; // mentioned this in doc but it does not work
                // request.query = 226 // without this api is not returning US contacts but it is use for search string so not using it
            }
            if(self.state.contactSearchQuery !== ''){
                request.page = 1
                request.query = self.state.contactSearchQuery
            }
            axios.get('/api/contacts.json', {params: request, cancelToken: this.signal.token}).then(function (response) {
                let contactIds = [];
                if(self.state.isChecked)
                    contactIds = self.returnEven(self.state.contactIds).concat(self.returnEven(response.data.contacts_ids))
                else
                    contactIds = self.state.contactIds.concat(response.data.contacts_ids)
                contactIds = [...new Set(contactIds)]
                if(self._isMounted)
                    self.setState({contacts: {...self.state.contacts, ...response.data.contacts}, totalContacts: response.data.total, contactIds: contactIds},() => self.setState({isLoading: false}))
            })
        })
    }

    renderSearch = () => {
        return (
            <div className="form-group">
                <input type="text" className="form-control" id="searchField" placeholder="Search here..." onChange = {this.handleKeyPress} value={this.state.contactSearchQuery}/>
            </div>
        )
    }

    handleKeyPress = (event) => {
        this.setState({contactSearchQuery: event.target.value, currentPage: 1, contacts: {}, contactIds: []}, () => this.getContactsFromApi())
    }

    handleModelClose = () => {
        this.setState({'contactOpen': false})
    }

    handleChecked = () => {
        this.setState({isChecked: !this.state.isChecked}, () => this.doEven());
    }

    returnEven = (arr) => arr.filter((x) => x % 2 === 0)

    doEven = () => {
        if(this.state.isChecked)
            this.setState({contactIds: this.returnEven(this.state.contactIds)})
        else
            this.setState({currentPage: 1, contacts: {}, contactIds: []}, () => this.getContactsFromApi())
    }

    renderPortal() {
        return (
            <div id="contactListingsModalCenter" className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="contactListingsModalCenterTitle" style={{display:'block', 'background': '#000000f0'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="contactListingsModalCenterTitle">Modal {this.state.name}</h5>
                        </div>
                        <div className="modal-body">
                            <img className={(this.state.isLoading)?'loading':''} src={require('../../assets/loading.gif')} alt=""/>
                            <div className="row mb-3">
                                <div className="col-sm-12" style={{minHeight: '386px'}}>
                                    {this.renderSearch()}
                                    <ul className="list-group contact-list-wrap" style={{position: ((this.state.isLoading)?'fixed':'relative')}}>
                                        {this.renderListings()}
                                        <li ref={loadingRef => (this.loadingRef = loadingRef)}></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center">
                                <Button btnType="a" label="All Contacts" callMeOnClick = {() => this.handleButtonClick('/a')} disableMe={this.state.isLoading}/>
                                <Button btnType="b" label="US Contacts" callMeOnClick = {() => this.handleButtonClick('/b')} disableMe={this.state.isLoading}/>
                                <Button btnType="c" label="Close" callMeOnClick = {() => this.handleButtonClick('/')} disableMe={this.state.isLoading}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="row justify-content-center align-items-left">
                                <input type="checkbox" onChange={ this.handleChecked }/>
                            </div>
                            <ContactDetailPortal open={this.state.contactOpen} contact={this.state.contactDetail} onModalClose={this.handleModelClose}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ContactListingsPortal)