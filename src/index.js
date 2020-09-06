import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import AllReducers from './reducers'
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import React from 'react';

import ContactListingsPortal from "./components/contactModals/contactListingsPortal"
import Main from "./components/main/main";
import './index.scss'

const store = createStore(AllReducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <div className={`container root-home-container`}>
                <Switch>
                    <Route path="/b">
                        <ContactListingsPortal/>
                    </Route>
                    <Route path="/a">
                        <ContactListingsPortal/>
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </div>
            </Router>
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root')
);