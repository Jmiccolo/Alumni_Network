import React from "react";
import { connect } from 'react-redux';
import { apiCall } from "../services/api";
import { useEffect, useState } from "react";
import OrgForm from "./OrgForm"
import Dashboard from './Dashboard';

function Homepage(props) {
    const [organization, setOrg] = useState(null);
    const [isVerified, setAlumni] = useState(false);
    useEffect(()=>{
        apiCall("get", `api/alumni/${props.currentAlumni.id}`)
        .then(alumni =>  {
            setAlumni(alumni.isVerified);
            apiCall("post", 'api/organizations/validate', {id:alumni._id})
                .then(res => res ? setOrg(alumni.organization):setOrg(null));
    })
    .catch(err => console.log(err));
    },[])
    if(isVerified){
    return (
        <div>
            {organization ?
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
        errors: state.errors
    };
}

export default connect(mapStateToProps)(Homepage);
