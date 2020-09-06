import React from 'react';
import { useHistory } from "react-router-dom";
import Button from "../buttons/button";

class Main extends React.Component{

    render(){
        const { history } = this.props;
        return (
            <div className="container" id={`main-component`}>
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