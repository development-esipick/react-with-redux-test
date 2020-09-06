import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ContactItem from "../presentational/contactItem";

const portalRoot = document.getElementById('contact-detail-portal-root');

export class contactDetailPortal extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false, contact: {}};
    }

    componentDidUpdate(prevProps) {
        if(prevProps.contact !== this.props.contact){
            document.addEventListener('click', this.handleDocumentClick);
            this.setState({open: this.props.open, contact: this.props.contact})
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.open !== state.open)
            return {open: props.open}
        return null;
    }

    handleDocumentClick = (e) => {
        if(e.toElement.id === 'contactDetailModalCenter')
            this.props.onModalClose();
    }

    render() {
        return ReactDOM.createPortal(this.renderPortal(), portalRoot);
    }

    renderPortal() {
        return (
            <Fragment>
                { this.state.open
                && (
                    <div id="contactDetailModalCenter" className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="contactDetailModalCenterTitle" style={{display:'block', 'background': '#000000f0'}}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="contactDetailModalCenterTitle">Contact Detail</h5>
                                </div>
                                <div className="modal-body">
                                    <div className="row justify-content-center align-items-center">
                                        <ul className="list-group contact-list-wrap">
                                            <ContactItem key={`detail-contact`} contact={this.state.contact} callContactClick = {()=>{}}/>
                                        </ul>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.props.onModalClose()}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            </Fragment>
        );
    }
}

export default contactDetailPortal;