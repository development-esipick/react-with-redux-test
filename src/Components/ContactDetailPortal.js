import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from "react-router-dom";

const portalRoot = document.getElementById('contact-detail-portal-root');

export class ContactDetailPortal extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false, contact: 0};
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

    handleDocumentClick = (e) => {
        if(e.toElement.id === 'contactDetailModalCenter'){
            document.removeEventListener('click', this.handleDocumentClick);
            this.props.history.push(this.props.pathname)
        }
    }

    render() {
        return ReactDOM.createPortal(this.renderPortal(), portalRoot);
    }

    renderPortal() {
        return (
            <>
                { this.state.open
                && (
                    <Fragment>
                        <div id="contactDetailModalCenter" className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="contactDetailModalCenterTitle" style={{display:'block', 'background': '#000000f0'}}>
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header"></div>
                                    <div className="modal-body">
                                        <div className="row justify-content-center align-items-center">
                                            <p>{this.state.contact}</p>
                                        </div>
                                    </div>
                                    <div className="modal-footer"></div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
            </>
        );
    }
}

export default function(props) {
    const history       = useHistory();
    const {pathname}    = useLocation();
    return <ContactDetailPortal {...props} history={history} pathname={pathname}/>;
}
