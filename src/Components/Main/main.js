import React from 'react';

class Main extends React.Component{
    render(){
        return (
            <div className="container" id={`main-component`}>
                <div className="row justify-content-center align-items-center">
                    <button type="button" className="btn btn-primary test-btn btn-a">Button A</button>
                    <button type="button" className="btn btn-secondary test-btn btn-b">Button B</button>
                </div>
            </div>
        );
    }
}

export default Main;