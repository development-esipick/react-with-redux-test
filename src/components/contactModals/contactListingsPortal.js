import { getContactsListAction, loadingContactsStarted, loadingContactsEnded, checkboxChanged, setContactIds, setName, setContactDetail, actionContactDetail, setContactSearchQuery, setPrevY, resetToInitialState } from "../../actions/contactsActions"
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux"
import React, { Component } from 'react';
import { connect } from "react-redux"
import ReactDOM from 'react-dom';

import ContactDetailPortal from "./contactDetailPortal";
import ContactItem from "../presentational/contactItem";
import Button from "../buttons/button";

const portalRoot = document.getElementById('contacts-listing-portal-root');

class contactListingsPortal extends Component {

    componentDidMount() {
        this.unlisten = this.props.history.listen((location) => {
            this.props.resetToInitialState()
            if(location.pathname !== '/')
                this.setNameFromStateAndCallApi(location.pathname)
        });
        this.setNameFromStateAndCallApi(this.props.location.pathname)
        this.observer = new IntersectionObserver(this.handleObserver.bind(this),{}).observe(this.loadingRef);
    }

    setNameFromStateAndCallApi = (pathName) => this.props.setName(pathName[1].toUpperCase(), () => this.getContactsFromApi())

    handleObserver = (entities) => {
        const y = entities[0].boundingClientRect.y;
        if (this.props.prevY > y && this.props.totalContacts > this.props.contactIds.length)
            this.getContactsFromApi(true);
        this.props.setPrevY(y)
    }

    componentWillUnmount = () => this.unlisten()

    render = () => ReactDOM.createPortal(this.renderPortal(), portalRoot)

    renderListings = () => {
        if(this.props.contacts !== undefined && this.props.contactIds)
            return this.props.contactIds.map((keyContactId) => {
                let contact = this.props.contacts[keyContactId];
                return <ContactItem key={keyContactId} contact={contact} callContactClick = {() => this.props.setContactDetail(contact)}/>
            })
    }

    getContactsFromApi = (fromInfiniteScroll = false) => {
        let request = {
            companyId : this.props.companyId,
            page  : this.props.currentPage
        };
        // :: IMPORTANT (your api is not returning only US contacts i have send same params as mentioned)
        // filter only US contacts
        // request.query = 226 // without this api is not returning US contacts but it is use for search string so not using it
        if(this.props.name === 'B')
            request.countryId = this.props.countryId
        if(this.props.contactSearchQuery !== ''){
            request.query = this.props.contactSearchQuery
            if(!fromInfiniteScroll)
                request.page = 1
        }
        this.props.getContactsListAction({params: request})
    }

    renderSearch = () => (
        <div className="form-group">
            <input type="text" className="form-control" id="searchField" placeholder="Search here..." onChange = {(event) => this.props.setContactSearchQuery(event.target.value, () => this.getContactsFromApi())} value={this.props.contactSearchQuery}/>
        </div>
    )

    doEven = () => {
        if(this.props.isChecked)
            this.props.setContactIds(this.props.contactIds.filter((x) => x % 2 === 0))
        else
            this.getContactsFromApi()
    }

    renderPortal() {
        return (
            <div id="contactListingsModalCenter" className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="contactListingsModalCenterTitle" style={{display:'block', 'background': '#000000f0'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="contactListingsModalCenterTitle">Modal {this.props.name}</h5>
                        </div>
                        <div className="modal-body">
                            <img className={(this.props.isLoading)?'loading':''} src={require('../../assets/loading.gif')} alt=""/>
                            <div className="row mb-3">
                                <div className="col-sm-12" style={{minHeight: '386px'}}>
                                    {this.renderSearch()}
                                    <ul className="list-group contact-list-wrap" style={{position: ((this.props.isLoading)?'fixed':'relative')}}>
                                        {this.renderListings()}
                                        <li ref={loadingRef => (this.loadingRef = loadingRef)}></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row justify-content-center align-items-center">
                                <Button btnType="a" label="All Contacts" callMeOnClick = {() => this.props.history.push('/a')} disableMe={this.props.isLoading || this.props.name === 'A'}/>
                                <Button btnType="b" label="US Contacts" callMeOnClick = {() => this.props.history.push('/b')} disableMe={this.props.isLoading || this.props.name === 'B'}/>
                                <Button btnType="c" label="Close" callMeOnClick = {() => this.props.history.push('/')} disableMe={this.props.isLoading}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="row justify-content-center align-items-left">
                                <input type="checkbox" onChange={() => this.props.checkboxChanged(() => this.doEven())} checked={this.props.isChecked}/>
                            </div>
                            <ContactDetailPortal open={this.props.contactOpen} contact={this.props.contactDetail} onModalClose={() => this.props.actionContactDetail(false)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = ({contacts}) => contacts

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loadingContactsStarted,
        setContactSearchQuery,
        getContactsListAction,
        loadingContactsEnded,
        actionContactDetail,
        resetToInitialState,
        setContactDetail,
        checkboxChanged,
        setContactIds,
        setPrevY,
        setName,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(contactListingsPortal))