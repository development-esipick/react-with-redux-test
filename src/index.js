import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.scss'
import Main from "./Components/Main/Main";
import ContactPortal from "./Components/ContactModals/ContactListingsPortal"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <div className={`container root-home-container`}>
                <Switch>
                    <Route path="/b">
                        <ContactPortal/>
                    </Route>
                    <Route path="/a">
                        <ContactPortal/>
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </div>
        </Router>
    </React.StrictMode>
    ,
    document.getElementById('root')
);