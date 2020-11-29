import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import Landing from "../components/Landing";
import HomePage from '../components/Homepage';
import Organization from '../components/Organization'
import Verify from '../components/Verify'

const Main = props => {
    const { currentAlumni } = props;
    if (!currentAlumni.isAuthenticated) {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Landing/>
                        </Route>
                        <Route path="/organization">
                            <Organization/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/verify/:token">
                        <Verify />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentAlumni: state.currentAlumni,
        errors: state.errors
    };
}

export default connect(mapStateToProps)(Main);