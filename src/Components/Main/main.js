import React from 'react';
import { useHistory } from "react-router-dom";
import Button from "../Buttons/Button";
import axios from "./../../axios";

class Main extends React.Component{

    getAjaxRequest = () => {
        axios.get('/api/contacts.json', {
            params: {
                companyId : 171,
                page  : 1,
                countryId : 226 ,
            }
        }).then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    render(){
        const { history } = this.props;
        return (
            <div className="container" id={`main-component`}>
                <button onClick={this.getAjaxRequest}>test ajax</button>
                <div className="row justify-content-center align-items-center">
                    <Button btnType="a" label="Button A" callMeOnClick = {() => history.push("/a")} />
                    <Button btnType="b" label="Button B" callMeOnClick = {() => history.push("/b")} />
                </div>
            </div>
        );
    }
}

export default function(props) {
    return <Main {...props} history={useHistory()} />;
}