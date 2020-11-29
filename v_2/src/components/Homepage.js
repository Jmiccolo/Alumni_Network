import React from "react";
import { connect } from 'react-redux';
import { apiCall } from "../services/api";
import { useEffect, useState } from "react";
import {isAlumniValidated} from '../store/actions/organization'
import OrgForm from "./OrgForm"
import Dashboard from './Dashboard';

function Homepage(props) {
    const {isVerified} = props.currentAlumni;
    const {isValidated} = props.currentOrg;
    useEffect(()=>{
        if(isVerified){
            isAlumniValidated(props.currentAlumni);
        }
    }, []);
    if(isVerified){
    return (
        <div>
            {isValidated ?
            <Dashboard/>
            :
            <OrgForm/>
            }
        </div>
    )
    }else {
        return (
            <div className="orgForm">
                <div className="orgForm-container">
                    We have sent an email to verify your account for the safety of your organization. Until you are verified we cannot confirm your acceptance to an organization.
            </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentAlumni: state.currentAlumni,
        currentOrg: state.currentOrg,
        errors: state.errors
    };
}

export default connect(mapStateToProps)(Homepage);
