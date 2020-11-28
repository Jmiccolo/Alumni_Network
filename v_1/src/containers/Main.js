import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Landing from "../components/Landing";
import HomePage from '../components/Homepage';

const Main = props => {
    const {currentBrother} = props;
        if(!currentBrother.isAuthenticated){
            return(
                <div>
                    <Landing />
                </div>
            )
        }
        return (
            <div>
                <HomePage />
            </div>
        )
}

function mapStateToProps(state){
    return{
        currentBrother: state.currentBrother,
        errors: state.errors
    };
}

export default withRouter(connect(mapStateToProps)(Main));